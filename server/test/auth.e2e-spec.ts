import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

describe('Authentication System (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();

        prisma = app.get<PrismaService>(PrismaService);
    });

    beforeEach(async () => {
        // Clean up database before each test
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await app.close();
    });

    describe('/auth/signup (POST)', () => {
        it('should create a new user successfully', () => {
            const signupData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '+1234567890',
            };

            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(signupData)
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.token).toBeDefined();
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.email).toBe(signupData.email);
                    expect(res.body.user.firstName).toBe(signupData.firstName);
                    expect(res.body.user.lastName).toBe(signupData.lastName);
                    expect(res.body.user.password).toBeUndefined(); // Password should not be returned
                });
        });

        it('should fail with invalid email', () => {
            const signupData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'invalid-email',
                password: 'password123',
            };

            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(signupData)
                .expect(400);
        });

        it('should fail with weak password', () => {
            const signupData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: '123',
            };

            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(signupData)
                .expect(400);
        });

        it('should fail when user already exists', async () => {
            const signupData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            };

            // Create user first
            await request(app.getHttpServer())
                .post('/auth/signup')
                .send(signupData)
                .expect(201);

            // Try to create same user again
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(signupData)
                .expect(409);
        });
    });

    describe('/auth/login (POST)', () => {
        beforeEach(async () => {
            // Create a test user
            await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });
        });

        it('should login successfully with correct credentials', () => {
            const loginData = {
                email: 'john.doe@example.com',
                password: 'password123',
            };

            return request(app.getHttpServer())
                .post('/auth/login')
                .send(loginData)
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.token).toBeDefined();
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.email).toBe(loginData.email);
                });
        });

        it('should fail with incorrect password', () => {
            const loginData = {
                email: 'john.doe@example.com',
                password: 'wrongpassword',
            };

            return request(app.getHttpServer())
                .post('/auth/login')
                .send(loginData)
                .expect(401);
        });

        it('should fail with non-existent email', () => {
            const loginData = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            return request(app.getHttpServer())
                .post('/auth/login')
                .send(loginData)
                .expect(401);
        });
    });

    describe('/auth/forgot-password (POST)', () => {
        beforeEach(async () => {
            // Create a test user
            await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });
        });

        it('should send reset email for existing user', () => {
            return request(app.getHttpServer())
                .post('/auth/forgot-password')
                .send({ email: 'john.doe@example.com' })
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBeDefined();
                });
        });

        it('should not reveal if email exists or not', () => {
            return request(app.getHttpServer())
                .post('/auth/forgot-password')
                .send({ email: 'nonexistent@example.com' })
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBeDefined();
                });
        });
    });

    describe('/auth/profile (GET)', () => {
        let authToken: string;

        beforeEach(async () => {
            // Create and login user
            const signupResponse = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            authToken = signupResponse.body.token;
        });

        it('should get user profile with valid token', () => {
            return request(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.email).toBe('john.doe@example.com');
                    expect(res.body.user.firstName).toBe('John');
                    expect(res.body.user.lastName).toBe('Doe');
                });
        });

        it('should fail without token', () => {
            return request(app.getHttpServer())
                .get('/auth/profile')
                .expect(401);
        });

        it('should fail with invalid token', () => {
            return request(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });

    describe('/auth/profile (PUT)', () => {
        let authToken: string;

        beforeEach(async () => {
            // Create and login user
            const signupResponse = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            authToken = signupResponse.body.token;
        });

        it('should update user profile successfully', () => {
            const updateData = {
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '+1234567890',
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
            };

            return request(app.getHttpServer())
                .put('/auth/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData)
                .expect(200)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.user.firstName).toBe(updateData.firstName);
                    expect(res.body.user.lastName).toBe(updateData.lastName);
                    expect(res.body.user.phone).toBe(updateData.phone);
                    expect(res.body.user.address).toBe(updateData.address);
                });
        });

        it('should fail without token', () => {
            return request(app.getHttpServer())
                .put('/auth/profile')
                .send({ firstName: 'Jane' })
                .expect(401);
        });
    });

    describe('/auth/change-password (POST)', () => {
        let authToken: string;

        beforeEach(async () => {
            // Create and login user
            const signupResponse = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            authToken = signupResponse.body.token;
        });

        it('should change password successfully', () => {
            const changePasswordData = {
                currentPassword: 'password123',
                newPassword: 'newpassword123',
            };

            return request(app.getHttpServer())
                .post('/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send(changePasswordData)
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBeDefined();
                });
        });

        it('should fail with incorrect current password', () => {
            const changePasswordData = {
                currentPassword: 'wrongpassword',
                newPassword: 'newpassword123',
            };

            return request(app.getHttpServer())
                .post('/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send(changePasswordData)
                .expect(401);
        });

        it('should fail with weak new password', () => {
            const changePasswordData = {
                currentPassword: 'password123',
                newPassword: '123',
            };

            return request(app.getHttpServer())
                .post('/auth/change-password')
                .set('Authorization', `Bearer ${authToken}`)
                .send(changePasswordData)
                .expect(400);
        });
    });

    describe('/auth/favorites (POST)', () => {
        let authToken: string;
        let propertyId: number;

        beforeEach(async () => {
            // Create and login user
            const signupResponse = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            authToken = signupResponse.body.token;

            // Create a test property
            const property = await prisma.property.create({
                data: {
                    title: 'Test Property',
                    description: 'Test Description',
                    price: 500000,
                    bedrooms: 3,
                    bathrooms: 2,
                    type: 'house',
                    status: 'for sale',
                },
            });

            propertyId = property.id;
        });

        it('should add property to favorites', () => {
            return request(app.getHttpServer())
                .post(`/auth/favorites/${propertyId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBe('Property added to favorites');
                });
        });

        it('should fail to add same property twice', async () => {
            // Add property to favorites first
            await request(app.getHttpServer())
                .post(`/auth/favorites/${propertyId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(201);

            // Try to add again
            return request(app.getHttpServer())
                .post(`/auth/favorites/${propertyId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(400);
        });

        it('should remove property from favorites', async () => {
            // Add property to favorites first
            await request(app.getHttpServer())
                .post(`/auth/favorites/${propertyId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(201);

            // Remove from favorites
            return request(app.getHttpServer())
                .post(`/auth/favorites/${propertyId}/remove`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(201)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBe('Property removed from favorites');
                });
        });
    });

    describe('/auth/verify-email (GET)', () => {
        it('should verify email with valid token', async () => {
            // Create user
            const signupResponse = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            // Get verification token from database
            const user = await prisma.user.findUnique({
                where: { email: 'john.doe@example.com' },
            });

            if (!user || !user.emailVerificationToken) {
                throw new Error('User or verification token not found');
            }

            return request(app.getHttpServer())
                .get(`/auth/verify-email?token=${user.emailVerificationToken}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBe('Email verified successfully');
                });
        });

        it('should fail with invalid token', () => {
            return request(app.getHttpServer())
                .get('/auth/verify-email?token=invalid-token')
                .expect(400);
        });
    });

    describe('Google OAuth', () => {
        it('should redirect to Google OAuth', () => {
            return request(app.getHttpServer())
                .get('/auth/google')
                .expect(302); // Redirect status
        });

        it('should handle Google OAuth callback', () => {
            // This test would require mocking the Google OAuth flow
            // For now, we'll just test that the endpoint exists
            return request(app.getHttpServer())
                .get('/auth/google/callback')
                .expect(302); // Redirect status
        });
    });
}); 