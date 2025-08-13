"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassNav } from "@/components/GlassNav"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Eye,
  Share2,
  Home,
  FolderOpen,
  User,
  Tag,
  ExternalLink
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
  readTime: string
  category: string
  tags: string[]
  image?: string
  views?: number
  featured?: boolean
}

// Sample articles data (same as writing page)
const articles: Article[] = [
  {
    slug: "machine-learning-basics",
    title: "Understanding Machine Learning Fundamentals",
    excerpt: "A comprehensive guide to the core concepts of machine learning, from supervised to unsupervised learning, and everything in between.",
    content: `
# Understanding Machine Learning Fundamentals

Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed. In this comprehensive guide, we'll explore the fundamental concepts that form the foundation of modern machine learning.

## What is Machine Learning?

Machine learning is the science of getting computers to act without being explicitly programmed. Instead of following pre-programmed rules, machine learning algorithms build mathematical models based on sample data, known as "training data," to make predictions or decisions.

## Types of Machine Learning

### 1. Supervised Learning

Supervised learning is the most common type of machine learning. In this approach, the algorithm learns from labeled training data, where each example includes both input features and the correct output.

**Examples:**
- Classification: Predicting whether an email is spam or not
- Regression: Predicting house prices based on features like size, location, and number of bedrooms

### 2. Unsupervised Learning

Unsupervised learning deals with data that has no labels. The algorithm tries to find hidden patterns or structures in the data.

**Examples:**
- Clustering: Grouping customers based on purchasing behavior
- Dimensionality reduction: Reducing the number of features while preserving important information

### 3. Reinforcement Learning

Reinforcement learning involves an agent learning to make decisions by taking actions in an environment to achieve maximum cumulative reward.

**Examples:**
- Game playing: Teaching a computer to play chess or Go
- Robotics: Teaching a robot to navigate through a maze

## Key Concepts in Machine Learning

### Features and Labels

- **Features**: The input variables used to make predictions (e.g., age, income, education level)
- **Labels**: The output variable we want to predict (e.g., whether someone will buy a product)

### Training and Testing

- **Training Data**: Used to teach the model
- **Testing Data**: Used to evaluate the model's performance on unseen data

### Overfitting and Underfitting

- **Overfitting**: When a model learns the training data too well, including noise, and performs poorly on new data
- **Underfitting**: When a model is too simple and fails to capture the underlying patterns in the data

## Popular Machine Learning Algorithms

### Supervised Learning Algorithms

1. **Linear Regression**: Predicts continuous values using a linear relationship
2. **Logistic Regression**: Predicts binary outcomes (0 or 1)
3. **Decision Trees**: Makes decisions based on a series of questions
4. **Random Forest**: Ensemble method using multiple decision trees
5. **Support Vector Machines**: Finds the best boundary between classes
6. **Neural Networks**: Inspired by biological neurons, capable of learning complex patterns

### Unsupervised Learning Algorithms

1. **K-Means Clustering**: Groups data into K clusters
2. **Hierarchical Clustering**: Creates a tree of clusters
3. **Principal Component Analysis (PCA)**: Reduces dimensionality while preserving variance

## The Machine Learning Workflow

### 1. Data Collection

Gather relevant data from various sources. The quality and quantity of data significantly impact model performance.

### 2. Data Preprocessing

- **Cleaning**: Remove or handle missing values, outliers, and errors
- **Transformation**: Scale features, encode categorical variables
- **Feature Engineering**: Create new features from existing ones

### 3. Model Selection

Choose appropriate algorithms based on:
- Problem type (classification, regression, clustering)
- Data size and characteristics
- Performance requirements
- Interpretability needs

### 4. Training

Train the model using the training data and tune hyperparameters.

### 5. Evaluation

Assess model performance using metrics like:
- **Classification**: Accuracy, Precision, Recall, F1-Score
- **Regression**: Mean Squared Error, R-squared, Mean Absolute Error

### 6. Deployment

Deploy the model in production and monitor its performance.

## Common Challenges in Machine Learning

### Data Quality Issues

- Missing or inconsistent data
- Outliers and noise
- Imbalanced datasets

### Model Performance

- Overfitting and underfitting
- Bias and variance trade-off
- Model interpretability

### Computational Resources

- Training time for large datasets
- Memory requirements
- Scalability issues

## Best Practices

### 1. Start Simple

Begin with simple models before moving to complex ones. Simple models are often more interpretable and less prone to overfitting.

### 2. Cross-Validation

Use cross-validation to get a more reliable estimate of model performance.

### 3. Feature Engineering

Invest time in creating meaningful features. Good features can significantly improve model performance.

### 4. Regularization

Use regularization techniques to prevent overfitting.

### 5. Ensemble Methods

Combine multiple models to improve performance and robustness.

## Tools and Libraries

### Python Libraries

- **Scikit-learn**: Comprehensive machine learning library
- **TensorFlow**: Deep learning framework by Google
- **PyTorch**: Deep learning framework by Facebook
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib/Seaborn**: Data visualization

### Other Tools

- **R**: Statistical computing and graphics
- **Weka**: Java-based machine learning software
- **RapidMiner**: Visual data science platform

## Conclusion

Machine learning is a powerful tool that can extract valuable insights from data and make accurate predictions. Understanding the fundamentals is crucial for building effective machine learning solutions.

The key to success in machine learning lies in:
- Understanding the problem and data
- Choosing appropriate algorithms
- Proper evaluation and validation
- Continuous learning and improvement

As you continue your machine learning journey, remember that practice and experimentation are essential. Start with simple problems, gradually increase complexity, and always validate your results.

## Next Steps

1. **Practice with Real Data**: Work on Kaggle competitions or real-world datasets
2. **Learn Deep Learning**: Explore neural networks and deep learning frameworks
3. **Study Advanced Topics**: Dive into topics like natural language processing, computer vision, and reinforcement learning
4. **Join Communities**: Participate in machine learning communities and forums
5. **Stay Updated**: Follow the latest research and developments in the field

Machine learning is a rapidly evolving field, and staying current with the latest techniques and tools is essential for success.
    `,
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-12-15",
    readTime: "8 min read",
    category: "Machine Learning",
    tags: ["AI", "ML", "Tutorial", "Beginners"],
    image: "/ai/ml-basics.jpg",
    views: 1250,
    featured: true
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization Techniques",
    excerpt: "Learn the best practices for optimizing React applications, from code splitting to memoization strategies.",
    content: `
# React Performance Optimization Techniques

Performance optimization in React is crucial for creating smooth user experiences. In this comprehensive guide, we'll explore various techniques to optimize your React applications.

## Why Performance Matters

Performance directly impacts user experience. Slow applications lead to:
- Higher bounce rates
- Poor user satisfaction
- Reduced conversion rates
- Negative SEO impact

## Key Performance Metrics

### Core Web Vitals

1. **Largest Contentful Paint (LCP)**: Measures loading performance
2. **First Input Delay (FID)**: Measures interactivity
3. **Cumulative Layout Shift (CLS)**: Measures visual stability

### React-Specific Metrics

- **Time to Interactive (TTI)**
- **Bundle Size**
- **Component Render Time**

## Optimization Techniques

### 1. Code Splitting

Code splitting allows you to split your code into smaller chunks that can be loaded on demand.

\`\`\`javascript
// Using React.lazy for component-level code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

\`\`\`javascript
// Memoizing components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering logic */}</div>;
});

// Memoizing values
const memoizedValue = useMemo(() => {
  return expensiveCalculation(props.data);
}, [props.data]);

// Memoizing callbacks
const memoizedCallback = useCallback(() => {
  doSomething(props.id);
}, [props.id]);
\`\`\`

### 3. Virtual Scrolling

For large lists, use virtual scrolling to render only visible items.

\`\`\`javascript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </List>
);
\`\`\`

### 4. Bundle Optimization

Optimize your bundle size using various techniques:

- **Tree Shaking**: Remove unused code
- **Minification**: Compress code
- **Compression**: Use gzip or brotli
- **CDN**: Serve static assets from CDN

### 5. Image Optimization

Optimize images for web:

- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Use appropriate sizes
- Compress images

\`\`\`javascript
// Lazy loading images
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      className={isLoaded ? 'loaded' : 'loading'}
    />
  );
};
\`\`\`

## Advanced Techniques

### 1. React Profiler

Use React Profiler to identify performance bottlenecks.

\`\`\`javascript
import { Profiler } from 'react';

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" or "update"
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed the update
  interactions // the Set of interactions belonging to this update
) {
  console.log('Render time:', actualDuration);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
\`\`\`

### 2. Web Workers

Use Web Workers for CPU-intensive tasks.

\`\`\`javascript
// worker.js
self.onmessage = function(e) {
  const result = expensiveCalculation(e.data);
  self.postMessage(result);
};

// Component
const [result, setResult] = useState(null);

useEffect(() => {
  const worker = new Worker('/worker.js');
  worker.onmessage = (e) => setResult(e.data);
  worker.postMessage(data);
  
  return () => worker.terminate();
}, [data]);
\`\`\`

### 3. Service Workers

Implement service workers for caching and offline functionality.

\`\`\`javascript
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/css/main.css',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
\`\`\`

## Performance Monitoring

### 1. React DevTools Profiler

Use the React DevTools Profiler to analyze component render times.

### 2. Lighthouse

Run Lighthouse audits to identify performance issues.

### 3. Web Vitals

Monitor Core Web Vitals using the web-vitals library.

\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
\`\`\`

## Best Practices

### 1. Component Design

- Keep components small and focused
- Use composition over inheritance
- Avoid prop drilling with Context or state management libraries

### 2. State Management

- Use appropriate state management solutions
- Avoid unnecessary state updates
- Use immutable updates

### 3. Rendering Optimization

- Avoid inline objects and functions in render
- Use React.memo for expensive components
- Optimize conditional rendering

### 4. Network Optimization

- Implement proper caching strategies
- Use HTTP/2 for multiple requests
- Optimize API calls

## Conclusion

Performance optimization is an ongoing process. Start with the basics and gradually implement more advanced techniques. Always measure performance before and after optimizations to ensure they're effective.

Remember:
- Profile first, optimize second
- Focus on user experience
- Monitor performance continuously
- Stay updated with latest techniques

## Resources

- [React Performance Documentation](https://reactjs.org/docs/optimizing-performance.html)
- [Web Vitals](https://web.dev/vitals/)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Performance Monitoring Tools](https://web.dev/performance-monitoring/)

Happy optimizing!
    `,
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-12-10",
    readTime: "12 min read",
    category: "Web Development",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    image: "/ai/react-optimization.jpg",
    views: 890
  }
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === params.slug)
    setArticle(foundArticle || null)
  }, [params.slug])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!article) {
    notFound()
  }

  // Convert markdown content to HTML (simplified)
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
        }
        if (line.startsWith('```')) {
          return <div key={index} className="bg-muted p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">{line.substring(3)}</div>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Navigation */}
      <GlassNav links={[
        { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
        { label: "Writing", href: "/writing", icon: <BookOpen className="h-5 w-5" /> },
        { label: "Work", href: "/work", icon: <FolderOpen className="h-5 w-5" /> }
      ]} />
      
      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/writing">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Article Image */}
          {article.image && (
            <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Article Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{article.category}</Badge>
              {article.featured && <Badge variant="default">Featured</Badge>}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
            
            <p className="text-xl text-muted-foreground">{article.excerpt}</p>
            
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
                {article.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.views.toLocaleString()} views
                  </div>
                )}
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <Card>
            <CardContent className="pt-8">
              <div className="article-content">
                {renderContent(article.content)}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{article.author}</h3>
                  <p className="text-muted-foreground">Software Engineer & AI Enthusiast</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter(a => a.slug !== article.slug)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Card key={relatedArticle.slug} className="group hover:border-primary transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link href={`/writing/${relatedArticle.slug}`}>
                        {relatedArticle.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{relatedArticle.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(relatedArticle.publishedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {relatedArticle.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
