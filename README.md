# CSV Parser

```csv
    string, number, null
      text,    1.1, null
  "value1",    1.1, null
" value1 ",    1.1, null
     "1.1",    100, null
    "null",    100, null
```

Will be

```json
[
  {
    "string": "text", "number": 1.1, "null": null
  },
  {
    "string": "value1", "number": 1.1, "null": null
  },
  {
    "string": " value1 ", "number": 1.1, "null": null
  },
  {
    "string": "1.1", "number": 100, "null": null
  },
  {
    "string": "null", "number": 100, "null": null
  },
]
```
