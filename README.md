# AcrisAI SDK

A TypeScript SDK for interacting with the AcrisAI API

## Installation

```bash
npm install acris-ai
```

## Quick Start

```typescript
import { AcrisAI } from 'acris-ai';

const acris = new AcrisAI('your-api-key');

const agentId = '<agent-id>';

// Run a task with the agent
const response = await acris.run(agentId, { body: {} });
console.log(response);


## Support

For support, email siraj.hasanov@thefor.xyz or open an issue on GitHub.