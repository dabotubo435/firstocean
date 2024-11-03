export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      carts: {
        Row: {
          created_at: string;
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          product_id: number;
          quantity?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          product_id?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_products_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          created_at: string;
          id: number;
          image: string | null;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image?: string | null;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      order_products: {
        Row: {
          id: number;
          order_id: number;
          product_id: number | null;
          quantity: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          order_id: number;
          product_id?: number | null;
          quantity: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          order_id?: number;
          product_id?: number | null;
          quantity?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_products_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_products_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          amount: number;
          created_at: string;
          delivered: boolean;
          id: number;
          paid: boolean;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          delivered?: boolean;
          id?: number;
          paid?: boolean;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          delivered?: boolean;
          id?: number;
          paid?: boolean;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category_id: number | null;
          created_at: string;
          description: string;
          id: number;
          image: string;
          name: string;
          price: number;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string;
          description?: string;
          id?: number;
          image: string;
          name: string;
          price: number;
        };
        Update: {
          category_id?: number | null;
          created_at?: string;
          description?: string;
          id?: number;
          image?: string;
          name?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          city: string | null;
          country: string | null;
          created_at: string;
          email: string;
          id: number;
          name: string;
          nationality: string | null;
          state: string | null;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email: string;
          id?: number;
          name: string;
          nationality?: string | null;
          state?: string | null;
          user_id?: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string;
          id?: number;
          name?: string;
          nationality?: string | null;
          state?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      staffs: {
        Row: {
          created_at: string;
          id: number;
          is_admin: boolean;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_admin?: boolean;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_admin?: boolean;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
