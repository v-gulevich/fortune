# Fortune API Documentation

A lightweight API that serves random fortunes.

---

## Quick Start: Simple Text Quote

For the simplest use case, you can get a random, safe-for-work quote directly from the command line in plain text format.

**Request:**
```shell
curl https://fortune.gulevich.by/
```

**Response:**
```text
APL is a mistake, carried through to perfection.  It is the language of the
future for the programming techniques of the past: it creates a new generation
of coding bums.
		-- Edsger W. Dijkstra, SIGPLAN Notices, Volume 17, Number 5
```

For more advanced options, such as retrieving specific quotes by ID or getting a JSON response, see the full API details below.

---

## JSON API

### Base URL

`https://fortune.gulevich.by/api/v1/fortune`

### Endpoint

### `GET /api/v1/fortune`

Retrieve a quote, either random or by ID.

---

## Query Parameters

| Parameter | Type    | Default | Description                                                                                                                                 |
| --------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number  | random  | Retrieve a specific quote by its index. <br>`id`: Returns the quote at that index. <br> Invalid IDs -> falls back to a random quote. |
| `safe`    | boolean | `true`  | Whether to filter out NSFW quotes. <br>`"true"`: Only safe quotes. <br>`"false"`: Allow all quotes.                                     |

---

## Cookies

| Cookie | Type    | Default | Description                                                                                                                     |
| ------ | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `safe` | boolean | `true`  | Same behavior as the `safe` query parameter. If both cookie and query param are provided, the **query param takes precedence**. |

---

## Response Format

All responses are JSON objects.

### Response Format

```typescript
interface Fortune {
  id: number;
  text: string;
  sfw: boolean;
  category: string;
}
```

```json
{
	"text": "APL is a mistake, carried through to perfection.  It is the language of the\nfuture for the programming techniques of the past: it creates a new generation\nof coding bums.\n\t\t-- Edsger W. Dijkstra, SIGPLAN Notices, Volume 17, Number 5",
	"sfw": true,
	"category": "computers",
	"id": 101
}
```

---

## Examples

### Get a random safe quote (default)

```http
GET /api/v1/fortune
```

Response:

```json
{
	"text": "APL is a mistake, carried through to perfection.  It is the language of the\nfuture for the programming techniques of the past: it creates a new generation\nof coding bums.\n\t\t-- Edsger W. Dijkstra, SIGPLAN Notices, Volume 17, Number 5",
	"sfw": true,
	"category": "computers",
	"id": 101
}
```

---

### Get a random NSFW quote

```http
GET /api/v1/fortune?safe=false
```

---

### Get a specific quote by ID

```http
GET /api/v1/fortune?id=500
```

---

## Notes

* There are total **21,810 quotes** in the dataset.
* `safe=true` ensures only safe-for-work quotes.
* Invalid or out-of-range IDs will return a random quote.
* NSFW quotes are included in the dataset, but filtered by the `safe` flag.