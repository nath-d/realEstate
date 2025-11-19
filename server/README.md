<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Real Estate Server

A NestJS server for managing real estate properties using Prisma as the ORM.

## Features

- Property management (CRUD operations)
- Image management
- Location tracking
- Agent relationships
- Similar property recommendations

## Architecture

This server uses **Prisma exclusively** for data modeling and validation. No DTOs are used - all data validation and typing is handled by Prisma's generated types.

### Key Components

- **Prisma Schema**: Defines all data models and relationships
- **Property Service**: Handles business logic using Prisma types
- **Property Controller**: REST API endpoints using Prisma input types

## API Endpoints

### Properties

- `POST /properties` - Create a new property
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get a specific property
- `GET /properties/:id/similar` - Get similar properties
- `PUT /properties/:id` - Update a property
- `DELETE /properties/:id` - Delete a property

## Data Types

All API endpoints use Prisma-generated types:

- `Prisma.PropertyCreateInput` - For creating properties
- `Prisma.PropertyUpdateInput` - For updating properties
- `Property` - The complete property model with relations

## Example Usage

### Creating a Property

**Important**: When creating related data (images, location), you must use Prisma's relation syntax with `create` objects.

```typescript
// POST /properties
{
  "title": "Modern Villa",
  "description": "Beautiful modern villa with ocean view",
  "price": 750000,
  "type": "villa",
  "status": "for sale",
  "bedrooms": 4,
  "bathrooms": 3.5,
  "garage": 2,
  "lotSize": "5000 sq ft",
  "livingArea": "3500 sq ft",
  "yearBuilt": 2020,
  "featured": true,
  "images": {
    "create": [
      { "url": "https://example.com/image1.jpg" },
      { "url": "https://example.com/image2.jpg" }
    ]
  },
  "location": {
    "create": {
      "latitude": 34.0522,
      "longitude": -118.2437,
      "address": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90210"
    }
  }
}
```

### Common Mistakes to Avoid

❌ **Incorrect** - Direct field assignment:
```json
{
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437,
    "address": "123 Main St"
  }
}
```

✅ **Correct** - Using `create` object:
```json
{
  "location": {
    "create": {
      "latitude": 34.0522,
      "longitude": -118.2437,
      "address": "123 Main St"
    }
  }
}
```

### Updating a Property

```typescript
// PUT /properties/1
{
  "price": 800000,
  "status": "sold",
  "images": {
    "deleteMany": {},
    "create": [
      { "url": "https://example.com/new-image.jpg" }
    ]
  }
}
```

### Property Types and Status Values

**Property Types:**
- `"villa"`
- `"apartment"`
- `"house"`
- `"penthouse"`

**Property Status:**
- `"for sale"`
- `"for rent"`
- `"sold"`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your database and update the DATABASE_URL in `.env`

3. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Benefits of Prisma-Only Approach

- **Type Safety**: Full TypeScript support with generated types
- **Validation**: Automatic validation through Prisma schema
- **Simplicity**: No need for separate DTO classes
- **Consistency**: Single source of truth for data models
- **Performance**: Optimized queries and relationships

## Troubleshooting

### Common Errors

1. **"Unknown argument" errors**: Make sure you're using the correct Prisma relation syntax with `create`, `connect`, or `connectOrCreate` objects.

2. **Validation errors**: Check that all required fields are provided and data types match the schema.

3. **Relation errors**: Ensure related data is properly structured using Prisma's relation syntax.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
