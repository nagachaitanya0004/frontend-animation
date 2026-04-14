# Frontend Animation Challenge: Cloud Optimization Insights

## Feature Chosen
I decided to implement a **Cloud Optimization Metrics/Insights** section. This feature was inspired by the product video, specifically the part where key data points (costs, usage, savings) are presented in a clean, high-impact grid.

## Why this feature?
I chose this because it represents a core functional part of any cloud management platform—distilling complex data into clear, actionable numbers. It allowed me to focus on creating a layout that feels both data-dense and visually balanced, while providing a great canvas for interactive elements and smooth animations.

## My Approach

### 1. Animations
I used **Framer Motion** for a scroll-triggered experience. Instead of having everything appear at once, I used a **staggered entrance** effect.
* **Scroll-based**: The cards only animate in when they enter the viewport, making the page feel "alive" as you scroll.
* **Subtle Motion**: I kept the movements small (20px slide-up and fade-in) so they feel professional and polished rather than flashy.
* **Interactions**: Added a very slight scale-up and shadow boost on hover to give immediate, soft feedback when interacting with different cards.

### 2. Data & Caching
* **Dynamic Fetching**: The data is fetched live from the [DummyJSON Products API](https://dummyjson.com/products).
* **Calculated Metrics**: I transformed raw product data into "Cloud Metrics." For example, "Total Cost" is the sum of product prices, and "Savings" is calculated based on the discount percentages.
* **TanStack Query**: I used React Query to handle the fetching. I set a `staleTime` of 5 minutes so that if you navigate or re-render, the data stays in cache and the UI remains snappy.

### 3. Technical Stack
* **Next.js (App Router)**: For the overall structure.
* **Tailwind CSS**: For quick, clean, and responsive layouts.
* **Framer Motion**: For the animation orchestration.
* **TanStack React Query**: For robust data fetching and state management.

## Tradeoffs & Decisions
* **Focus over Breadth**: I chose to polish one high-impact section perfectly rather than building a wide (but shallow) dashboard with many empty sections.
* **Simplicity**: I kept the naming and structure very natural. For instance, I used CSS variables for design tokens so that theme changes (light/dark mode) would be a breeze without overcomplicating the JS logic.

## If I had more time...
I would have added **data visualization** (mini sparklines or progress bars) inside each card to show trends. I'd also implement a more robust loading skeleton instead of a simple "Loading..." message to keep the layout stable during data fetching.

---
*Created as part of the Frontend Animation Task.*
