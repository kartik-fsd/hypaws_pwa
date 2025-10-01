import { createClient } from '@/lib/supabase/client';
import { LoginCredentials, User } from '@/lib/types/database.types';

export class AuthService {
  private supabase = createClient();

  async signInWithPhone(credentials: LoginCredentials): Promise<{ user: User; error: string | null }> {
    try {
      // Use email format: phone_number@hypaws.local (e.g., +1234567890@hypaws.local)
      const email = `${credentials.phone_number.replace(/[^0-9+]/g, '')}@hypaws.local`;

      const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: credentials.password,
      });

      if (authError || !authData.user) {
        return {
          user: null as never,
          error: authError?.message || 'Failed to sign in',
        };
      }

      const { data: userData, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError || !userData) {
        return {
          user: null as never,
          error: userError?.message || 'User profile not found',
        };
      }

      return { user: userData, error: null };
    } catch (error) {
      return {
        user: null as never,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    const { error } = await this.supabase.auth.signOut();
    return {
      error: error?.message || null,
    };
  }

  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: { user: authUser }, error: authError } = await this.supabase.auth.getUser();

      if (authError || !authUser) {
        return { user: null, error: authError?.message || null };
      }

      const { data: userData, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (userError || !userData) {
        return { user: null, error: userError?.message || null };
      }

      return { user: userData, error: null };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  async getUserRole(): Promise<{ role: 'admin' | 'tasker' | null; error: string | null }> {
    const { user, error } = await this.getCurrentUser();
    if (error || !user) {
      return { role: null, error: error || 'No user found' };
    }
    return { role: user.role, error: null };
  }
}