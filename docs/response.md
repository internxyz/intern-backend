# Response

```json
{
  "status": "ok",          // "ok" | "error"
  "code": 200,             // mirrors the HTTP status when relevant
  "message": "Success",    // human-readable summary
  "meta": {                // optional: paging, rate-limit hints, etc.
    "requestId": "4b9e…",
    "page": 2,
    "perPage": 25,
    "total": 143
  },
  "data": {                // payload varies by endpoint
    /* …actual response object… */
  },
  "error": null            // null on success; filled on failure
}
```