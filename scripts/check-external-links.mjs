const urls = [
  "https://zentixchatbot.cloud/",
  "https://hablaya.cloud/",
  "https://minitiendai.com/",
  "https://ordenai.cloud/",
  "https://zentix-office.vercel.app/demo/",
  "https://tonalli.cloud/app",
  "https://github.com/jgazcagtz/zentix-office",
  "https://github.com/jgazcagtz",
];

const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
        headers: { "user-agent": "jorge-gasca-portfolio-link-check/1.0" },
      });
      return { url, status: response.status, ok: response.status < 400 };
    } catch (error) {
      return {
        url,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }),
);

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.url}`);
}

const failures = results.filter((result) => !result.ok);
if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
