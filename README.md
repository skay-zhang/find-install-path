# Find Install Path

This is a tool to find the installation location of an application

## Support Platform

* [x] Windows: 1.0.0+
* [ ] MacOS: Plan...
* [ ] Linux: Plan...

## Encoding Support

* [x] GBK
* [x] UTF8

## How Use

### Add to project
```shell
# Use npm
npm add find-install-path
# Use pnpm
pnpm add find-install-path
# Use yarn
yarn add find-install-path
```

### Code Examples

```javascript
// Import
import { find } from 'find-install-path';
// Use
const path = find('Microsoft Edge');
```