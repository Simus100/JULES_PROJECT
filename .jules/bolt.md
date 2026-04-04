## 2026-04-04 - [Remotion Render Loop Optimization]
**Learning:** In Remotion, components re-render on every single frame (e.g., 30-60 times a second). Operations like string splitting (`String.prototype.split`) directly in the component body will execute continuously, causing unnecessary CPU usage and garbage collection overhead.
**Action:** Always wrap derived data that doesn't depend on the current frame (like splitting static text into words) in `useMemo` to ensure it's calculated only once when its dependencies change, protecting the hot render loop.
