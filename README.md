# Find Install Path

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Package](https://github.com/skay-zhang/find-install-path/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/skay-zhang/find-install-path/actions/workflows/publish-npm.yml) 
[![CodeQL](https://github.com/skay-zhang/find-install-path/workflows/CodeQL/badge.svg)](https://github.com/skay-zhang/find-install-path/security/code-scanning)

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

## Dependabot

* iconv-lite
* nodejs/child_process