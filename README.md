# AcrisAI SDK

A TypeScript SDK for interacting with the AcrisAI API

## Installation

```bash
npm install acris-ai
```

## Quick Start

```typescript
import { AcrisAI } from '@acrisai/sdk';

const acris = new AcrisAI('your-api-key');

// You can get agent id from https://app.acris.ai 
const agentId = '<agent-id>';

// Run a task with the agent
const response = await acris.run(agentId, { inputs: {} });
console.log(response);


## Support

For support, email siraj.hasanov@thefor.xyz or open an issue on GitHub.