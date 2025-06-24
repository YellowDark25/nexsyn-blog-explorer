import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const BUNDLE_SIZE_LIMIT = {
  js: 250, // KB
  css: 50,  // KB
  total: 512 // KB
};

const PERFORMANCE_BUDGET = {
  'largest-contentful-paint': 2.5, // seconds
  'first-input-delay': 100, // milliseconds
  'cumulative-layout-shift': 0.1, // score
};

console.log('🔍 Analyzing bundle performance...\n');

// 1. Build the project with stats
console.log('📦 Building project with bundle analysis...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// 2. Check if stats file exists
const statsPath = join(process.cwd(), 'dist', 'stats.html');
if (existsSync(statsPath)) {
  console.log('✅ Bundle stats generated at dist/stats.html');
} else {
  console.log('⚠️ Bundle stats not found. Make sure rollup-plugin-visualizer is configured.');
}

// 3. Analyze dist folder
console.log('\n📊 Bundle Analysis:');
const distPath = join(process.cwd(), 'dist');

if (existsSync(distPath)) {
  try {
    const distFiles = execSync(`find ${distPath} -type f -name "*.js" -o -name "*.css" | sort`, { encoding: 'utf8' }).trim().split('\n');
    
    let totalJsSize = 0;
    let totalCssSize = 0;
    let totalSize = 0;
    
    distFiles.forEach(file => {
      if (!file) return;
      
      try {
        const stats = execSync(`stat -f%z "${file}"`, { encoding: 'utf8' }).trim();
        const sizeBytes = parseInt(stats);
        const sizeKb = (sizeBytes / 1024).toFixed(2);
        
        const fileName = file.split('/').pop();
        const isJs = fileName.endsWith('.js');
        const isCss = fileName.endsWith('.css');
        
        if (isJs) {
          totalJsSize += sizeBytes;
        } else if (isCss) {
          totalCssSize += sizeBytes;
        }
        
        totalSize += sizeBytes;
        
        const emoji = isJs ? '📜' : isCss ? '🎨' : '📄';
        const warning = (isJs && sizeBytes > BUNDLE_SIZE_LIMIT.js * 1024) || 
                       (isCss && sizeBytes > BUNDLE_SIZE_LIMIT.css * 1024) ? ' ⚠️' : '';
        
        console.log(`${emoji} ${fileName}: ${sizeKb} KB${warning}`);
      } catch (err) {
        // Fallback for systems without stat command
        console.log(`📄 ${file.split('/').pop()}: size unknown`);
      }
    });
    
    const totalJsKb = (totalJsSize / 1024).toFixed(2);
    const totalCssKb = (totalCssSize / 1024).toFixed(2);
    const totalKb = (totalSize / 1024).toFixed(2);
    
    console.log('\n📈 Summary:');
    console.log(`Total JS: ${totalJsKb} KB ${totalJsSize > BUNDLE_SIZE_LIMIT.js * 1024 ? '⚠️' : '✅'}`);
    console.log(`Total CSS: ${totalCssKb} KB ${totalCssSize > BUNDLE_SIZE_LIMIT.css * 1024 ? '⚠️' : '✅'}`);
    console.log(`Total Bundle: ${totalKb} KB ${totalSize > BUNDLE_SIZE_LIMIT.total * 1024 ? '⚠️' : '✅'}`);
    
    // 4. Performance recommendations
    console.log('\n🚀 Performance Recommendations:');
    
    if (totalJsSize > BUNDLE_SIZE_LIMIT.js * 1024) {
      console.log('⚠️ JS bundle size exceeds recommended limit');
      console.log('   - Consider lazy loading more components');
      console.log('   - Check for duplicate dependencies');
      console.log('   - Use dynamic imports for large libraries');
    }
    
    if (totalCssSize > BUNDLE_SIZE_LIMIT.css * 1024) {
      console.log('⚠️ CSS bundle size exceeds recommended limit');
      console.log('   - Consider purging unused CSS');
      console.log('   - Use critical CSS extraction');
    }
    
    if (totalSize > BUNDLE_SIZE_LIMIT.total * 1024) {
      console.log('⚠️ Total bundle size exceeds recommended limit');
      console.log('   - Enable compression (gzip/brotli)');
      console.log('   - Implement code splitting');
      console.log('   - Consider tree shaking optimization');
    } else {
      console.log('✅ Bundle size is within recommended limits');
    }
    
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message);
  }
} else {
  console.log('❌ Dist folder not found. Run npm run build first.');
}

// 5. Performance monitoring setup
console.log('\n🔬 Performance Monitoring Setup:');
console.log('Add these environment variables for production monitoring:');
console.log('VITE_GOOGLE_ANALYTICS_ID=your-ga-id');
console.log('VITE_PERFORMANCE_MONITORING=true');

console.log('\n📊 Core Web Vitals Targets:');
Object.entries(PERFORMANCE_BUDGET).forEach(([metric, target]) => {
  console.log(`• ${metric}: ${target}${metric.includes('delay') ? 'ms' : metric.includes('paint') ? 's' : ''}`);
});

console.log('\n🛠️ Additional Optimizations to Consider:');
console.log('• Image optimization (WebP, AVIF formats)');
console.log('• Service Worker for caching');
console.log('• Resource preloading for critical assets');
console.log('• CDN for static assets');
console.log('• Database query optimization');
console.log('• API response caching');

console.log('\n🎯 Next Steps:');
console.log('1. Open dist/stats.html to visualize bundle composition');
console.log('2. Run lighthouse audit: npx lighthouse https://your-domain.com');
console.log('3. Monitor Core Web Vitals in production');
console.log('4. Set up performance budgets in CI/CD');

console.log('\n✅ Bundle analysis complete!'); 