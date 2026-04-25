import { BaseSupplier } from './base';
import { SupplierProduct, SupplierType } from './types';
import { XMLParser } from 'fast-xml-parser';

export class PerfectDealzSupplier extends BaseSupplier {
  protected supplierType: SupplierType = 'perfect_dealz';

  async fetchProducts(): Promise<SupplierProduct[]> {
    const feedUrl = process.env.PERFECT_DEALZ_FEED_URL || 'https://www.perfectdealz.co.za/feed.xml';

    try {
      const response = await fetch(feedUrl);

      if (!response.ok) {
        throw new Error(`Perfect Dealz feed error: ${response.status} ${response.statusText}`);
      }

      const xmlData = await response.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
      });
      const result = parser.parse(xmlData);

      // Map Perfect Dealz XML structure to our SupplierProduct interface
      // Handle both RSS/Google Shopping and Atom formats
      const products = result.rss?.channel?.item || result.feed?.entry || result.products?.product || [];
      const productArray = Array.isArray(products) ? products : [products];

      return (productArray as Record<string, unknown>[]).map((p) => {
        // Extract image from summary if it's an Atom feed and g:image_link is missing
        let imageUrl = (p['g:image_link'] || p.image_url) as string | undefined;
        
        const summary = p.summary as Record<string, string> | undefined;
        if (!imageUrl && summary?.['#text']) {
          const imgMatch = summary['#text'].match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        // Handle Atom variants (taking the first one for price/sku if available)
        const variants = p['s:variant'];
        const variant = (Array.isArray(variants) ? variants[0] : variants) as Record<string, unknown> | undefined;
        
        const vPrice = variant?.['s:price'] as Record<string, unknown> | string | undefined;
        const vPriceStr = typeof vPrice === 'object' ? vPrice?.['#text'] : vPrice;
        
        const priceStr = (p['g:price'] || p.price || vPriceStr) as string | number | undefined;
        const sku = (p['g:mpn'] || p.sku || variant?.['s:sku']) as string | undefined;

        const titleVal = p.title as Record<string, unknown> | string | undefined;
        const title = (typeof titleVal === 'object' ? titleVal?.['#text'] : titleVal || p['g:title']) as string | undefined;
        
        const summaryVal = p.summary as Record<string, unknown> | string | undefined;
        const description = (typeof summaryVal === 'object' ? summaryVal?.['#text'] : summaryVal || p.description || p['g:description']) as string | undefined;

        const linkVal = p.link as Record<string, unknown> | string | undefined;
        const linkHref = typeof linkVal === 'object' ? linkVal?.['@_href'] : linkVal;

        return {
          supplier_id: String(p['g:id'] || p.id || p.sku || linkHref || p.link),
          supplier: this.supplierType,
          title: title || '',
          description: description || '',
          price_zar: this.parsePrice(priceStr || 0),
          original_price_zar: p['g:sale_price'] ? this.parsePrice(p['g:price'] as string) : undefined,
          stock_count: p['g:availability'] === 'in stock' ? 100 : 50,
          category: (p['g:product_type'] || p.category || p['s:type']) as string | undefined,
          image_url: imageUrl,
          additional_images: Array.isArray(p['g:additional_image_link']) 
            ? (p['g:additional_image_link'] as string[]) 
            : (p['g:additional_image_link'] ? [p['g:additional_image_link'] as string] : []),
          sku: sku,
        };
      });
    } catch (error) {
      console.error('Error fetching from Perfect Dealz:', error);
      throw error;
    }
  }

  private parsePrice(priceStr: string | number): number {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    // Remove " ZAR", " R", and commas
    const cleaned = priceStr.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned);
  }
}
