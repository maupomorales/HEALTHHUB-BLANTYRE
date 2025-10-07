import { prisma } from '../../lib/prisma';
import analytics from './analytics';
import errorHandler from './errorHandler';

export interface ClientData {
  name: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
  avatar?: string;
  preferences?: any;
}

export interface ProviderData {
  name: string;
  type: string;
  address: string;
  phone: string;
  hours?: string;
  services: string[];
  area: string;
  website?: string;
  email?: string;
  description?: string;
  images?: string[];
  coordinates?: { latitude: number; longitude: number };
  ownerId?: number;
}

export interface ReviewData {
  providerId: number;
  userId: number;
  rating: number;
  comment?: string;
}

export interface BookingData {
  providerId: number;
  userId: number;
  date: Date;
  time: string;
  serviceType: string;
  notes?: string;
}

class ClientManagementService {
  // User Management
  async createUser(userData: ClientData) {
    try {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          avatar: userData.avatar,
          preferences: userData.preferences,
        },
      });

      await analytics.trackEvent('user_created', {
        user_id: user.id,
        role: userData.role,
      });

      return user;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_USER',
      });
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          ownedProviders: true,
          reviews: true,
          bookings: true,
        },
      });
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'GET_USER',
      });
      throw error;
    }
  }

  async updateUser(id: number, userData: Partial<ClientData>) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: userData,
      });

      await analytics.trackEvent('user_updated', {
        user_id: id,
      });

      return user;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'UPDATE_USER',
      });
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      await prisma.user.delete({
        where: { id },
      });

      await analytics.trackEvent('user_deleted', {
        user_id: id,
      });
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'DELETE_USER',
      });
      throw error;
    }
  }

  // Provider Management
  async createProvider(providerData: ProviderData) {
    try {
      const provider = await prisma.provider.create({
        data: {
          name: providerData.name,
          type: providerData.type,
          address: providerData.address,
          phone: providerData.phone,
          hours: providerData.hours,
          services: providerData.services,
          area: providerData.area,
          website: providerData.website,
          email: providerData.email,
          description: providerData.description,
          images: providerData.images || [],
          coordinates: providerData.coordinates,
          ownerId: providerData.ownerId,
        },
      });

      await analytics.trackEvent('provider_created', {
        provider_id: provider.id,
        type: providerData.type,
        area: providerData.area,
      });

      return provider;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_PROVIDER',
      });
      throw error;
    }
  }

  async updateProvider(id: number, providerData: Partial<ProviderData>) {
    try {
      const provider = await prisma.provider.update({
        where: { id },
        data: providerData,
      });

      await analytics.trackEvent('provider_updated', {
        provider_id: id,
      });

      return provider;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'UPDATE_PROVIDER',
      });
      throw error;
    }
  }

  async verifyProvider(id: number) {
    try {
      const provider = await prisma.provider.update({
        where: { id },
        data: { isVerified: true },
      });

      await analytics.trackEvent('provider_verified', {
        provider_id: id,
      });

      return provider;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'VERIFY_PROVIDER',
      });
      throw error;
    }
  }

  async getProvidersByArea(area: string) {
    try {
      return await prisma.provider.findMany({
        where: {
          area: {
            contains: area,
            mode: 'insensitive',
          },
          isActive: true,
        },
        include: {
          reviews: true,
          owner: true,
        },
      });
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'GET_PROVIDERS_BY_AREA',
      });
      throw error;
    }
  }

  // Review Management
  async createReview(reviewData: ReviewData) {
    try {
      const review = await prisma.review.create({
        data: {
          providerId: reviewData.providerId,
          userId: reviewData.userId,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
      });

      // Update provider rating
      await this.updateProviderRating(reviewData.providerId);

      await analytics.trackEvent('review_created', {
        provider_id: reviewData.providerId,
        rating: reviewData.rating,
      });

      return review;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_REVIEW',
      });
      throw error;
    }
  }

  private async updateProviderRating(providerId: number) {
    try {
      const reviews = await prisma.review.findMany({
        where: { providerId },
        select: { rating: true },
      });

      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

      await prisma.provider.update({
        where: { id: providerId },
        data: { rating: averageRating },
      });
    } catch (error) {
      console.warn('Failed to update provider rating:', error);
    }
  }

  // Booking Management
  async createBooking(bookingData: BookingData) {
    try {
      const booking = await prisma.booking.create({
        data: {
          providerId: bookingData.providerId,
          userId: bookingData.userId,
          date: bookingData.date,
          time: bookingData.time,
          serviceType: bookingData.serviceType,
          notes: bookingData.notes,
        },
      });

      await analytics.trackEvent('booking_created', {
        provider_id: bookingData.providerId,
        service_type: bookingData.serviceType,
      });

      return booking;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_BOOKING',
      });
      throw error;
    }
  }

  async updateBookingStatus(bookingId: number, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') {
    try {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status },
      });

      await analytics.trackEvent('booking_status_updated', {
        booking_id: bookingId,
        status,
      });

      return booking;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'UPDATE_BOOKING_STATUS',
      });
      throw error;
    }
  }

  // Emergency Contacts Management
  async createEmergencyContact(name: string, number: string, type: string, description?: string) {
    try {
      const contact = await prisma.emergencyContact.create({
        data: {
          name,
          number,
          type,
          description,
        },
      });

      await analytics.trackEvent('emergency_contact_created', {
        type,
      });

      return contact;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_EMERGENCY_CONTACT',
      });
      throw error;
    }
  }

  async getEmergencyContacts() {
    try {
      return await prisma.emergencyContact.findMany({
        where: { isActive: true },
        orderBy: { priority: 'asc' },
      });
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'GET_EMERGENCY_CONTACTS',
      });
      throw error;
    }
  }

  // Health Tips Management
  async createHealthTip(title: string, content: string, category: string) {
    try {
      const tip = await prisma.healthTip.create({
        data: {
          title,
          content,
          category,
        },
      });

      await analytics.trackEvent('health_tip_created', {
        category,
      });

      return tip;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'CREATE_HEALTH_TIP',
      });
      throw error;
    }
  }

  async getHealthTips(category?: string) {
    try {
      return await prisma.healthTip.findMany({
        where: {
          isActive: true,
          ...(category && { category }),
        },
        orderBy: { priority: 'asc' },
      });
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'GET_HEALTH_TIPS',
      });
      throw error;
    }
  }

  // Analytics and Reporting
  async getDashboardStats() {
    try {
      const [
        totalUsers,
        totalProviders,
        totalBookings,
        totalReviews,
        activeProviders,
        verifiedProviders,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.provider.count(),
        prisma.booking.count(),
        prisma.review.count(),
        prisma.provider.count({ where: { isActive: true } }),
        prisma.provider.count({ where: { isVerified: true } }),
      ]);

      return {
        totalUsers,
        totalProviders,
        totalBookings,
        totalReviews,
        activeProviders,
        verifiedProviders,
        verificationRate: totalProviders > 0 ? (verifiedProviders / totalProviders) * 100 : 0,
      };
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'GET_DASHBOARD_STATS',
      });
      throw error;
    }
  }

  // Bulk Operations
  async bulkCreateProviders(providers: ProviderData[]) {
    try {
      const results = await Promise.all(
        providers.map(provider => this.createProvider(provider))
      );

      await analytics.trackEvent('bulk_providers_created', {
        count: providers.length,
      });

      return results;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'BULK_CREATE_PROVIDERS',
      });
      throw error;
    }
  }

  async exportProviderData(area?: string) {
    try {
      const providers = await prisma.provider.findMany({
        where: {
          ...(area && { area }),
        },
        include: {
          reviews: true,
          owner: true,
        },
      });

      await analytics.trackEvent('provider_data_exported', {
        area,
        count: providers.length,
      });

      return providers;
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'ClientManagementService',
        action: 'EXPORT_PROVIDER_DATA',
      });
      throw error;
    }
  }
}

export default new ClientManagementService();




