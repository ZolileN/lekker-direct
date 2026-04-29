async function run() {
  const r = await fetch('https://perfectdealz.co.za/products.json?limit=250');
  const t = await r.json();
  const electronics = [];
  const fashion = [];
  
  t.products.forEach(p => {
    const tags = p.tags.map(t => t.toLowerCase());
    const type = p.product_type.toLowerCase();
    
    if (tags.some(t => t.includes('electronic') || t.includes('tech') || t.includes('phone') || t.includes('audio') || t.includes('watch') || t.includes('speaker') || t.includes('camera')) || type.includes('electronic')) {
       electronics.push(p.title);
    } else if (tags.some(t => t.includes('fashion') || t.includes('clothing') || t.includes('wear') || t.includes('bag') || t.includes('apparel')) || type.includes('fashion')) {
       fashion.push(p.title);
    }
  });
  console.log('Electronics:', electronics.length);
  console.log('Fashion:', fashion.length);
  if (electronics.length > 0) console.log('Sample Electronics:', electronics.slice(0, 3));
  if (fashion.length > 0) console.log('Sample Fashion:', fashion.slice(0, 3));
}
run();
