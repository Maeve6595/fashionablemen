import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'product.json');

function fail(msg) {
  console.error('\u274c  ' + msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log('\u2705  ' + msg);
}

try {
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    fail('Root JSON must be an array of products');
  } else {
    ok(`Loaded ${data.length} products`);
  }

  const requiredFields = ['id', 'slug', 'title', 'category', 'subCategory', 'price'];
  const seenIds = new Set();
  const seenSlugs = new Set();
  let errors = 0;

  data.forEach((p, idx) => {
    requiredFields.forEach(f => {
      if (p[f] === undefined || p[f] === null || p[f] === '') {
        errors++; fail(`Product #${idx} missing field: ${f}`);
      }
    });
    if (seenIds.has(p.id)) { errors++; fail(`Duplicate id: ${p.id}`); } else { seenIds.add(p.id); }
    if (seenSlugs.has(p.slug)) { errors++; fail(`Duplicate slug: ${p.slug}`); } else { seenSlugs.add(p.slug); }
    if (typeof p.price !== 'number' || p.price < 0) { errors++; fail(`Invalid price for id ${p.id}`); }
  });

  if (errors === 0) {
    ok('All products passed validation');
  } else {
    fail(`Validation finished with ${errors} error(s)`);
  }
} catch (e) {
  fail('Failed to read/parse product.json: ' + e.message);
}
