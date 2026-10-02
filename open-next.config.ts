import type { OpenNextConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// 칼럼 응답은 R2에 캐시하고, 어드민 저장 시 /api/revalidate가 D1 태그를 무효화해 즉시 갱신한다.
// 바인딩(R2/D1/self-reference)은 wrangler.toml 참고.
const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: () => Promise.resolve(r2IncrementalCache),
      tagCache: () => Promise.resolve(d1NextTagCache),
      queue: () => Promise.resolve(memoryQueue),
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
