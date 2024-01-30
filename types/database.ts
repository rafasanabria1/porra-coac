export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      actuaciones: {
        Row: {
          agrupacion_id: string | null;
          fase: Database["public"]["Enums"]["fase"];
          fecha: string;
          id: number;
          orden: number;
          youtube_id: string | null;
        };
        Insert: {
          agrupacion_id?: string | null;
          fase: Database["public"]["Enums"]["fase"];
          fecha: string;
          id?: number;
          orden: number;
          youtube_id?: string | null;
        };
        Update: {
          agrupacion_id?: string | null;
          fase?: Database["public"]["Enums"]["fase"];
          fecha?: string;
          id?: number;
          orden?: number;
          youtube_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "actuaciones_agrupacion_id_fkey";
            columns: ["agrupacion_id"];
            isOneToOne: false;
            referencedRelation: "agrupaciones";
            referencedColumns: ["id"];
          },
        ];
      };
      agrupaciones: {
        Row: {
          anyo: number;
          cabeza_de_serie: boolean;
          direccion: string | null;
          enlace_codigo_carnaval: string | null;
          id: string;
          letra: string | null;
          localidad: string | null;
          modalidad: Database["public"]["Enums"]["modalidad"];
          musica: string | null;
          nombre: string;
        };
        Insert: {
          anyo: number;
          cabeza_de_serie?: boolean;
          direccion?: string | null;
          enlace_codigo_carnaval?: string | null;
          id?: string;
          letra?: string | null;
          localidad?: string | null;
          modalidad: Database["public"]["Enums"]["modalidad"];
          musica?: string | null;
          nombre: string;
        };
        Update: {
          anyo?: number;
          cabeza_de_serie?: boolean;
          direccion?: string | null;
          enlace_codigo_carnaval?: string | null;
          id?: string;
          letra?: string | null;
          localidad?: string | null;
          modalidad?: Database["public"]["Enums"]["modalidad"];
          musica?: string | null;
          nombre?: string;
        };
        Relationships: [];
      };
      cuartos: {
        Row: {
          agrupacion_id: string | null;
          fecha: string;
          id: number;
          orden: number;
          youtube_id: string | null;
        };
        Insert: {
          agrupacion_id?: string | null;
          fecha: string;
          id?: number;
          orden: number;
          youtube_id?: string | null;
        };
        Update: {
          agrupacion_id?: string | null;
          fecha?: string;
          id?: number;
          orden?: number;
          youtube_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cuartos_agrupacion_id_fkey";
            columns: ["agrupacion_id"];
            isOneToOne: false;
            referencedRelation: "agrupaciones";
            referencedColumns: ["id"];
          },
        ];
      };
      preliminares: {
        Row: {
          agrupacion_id: string | null;
          fecha: string;
          id: number;
          orden: number;
          youtube_id: string | null;
        };
        Insert: {
          agrupacion_id?: string | null;
          fecha: string;
          id?: number;
          orden: number;
          youtube_id?: string | null;
        };
        Update: {
          agrupacion_id?: string | null;
          fecha?: string;
          id?: number;
          orden?: number;
          youtube_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "preliminares_agrupacion_id_fkey";
            columns: ["agrupacion_id"];
            isOneToOne: false;
            referencedRelation: "agrupaciones";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      fase: "preliminar" | "cuartos" | "semifinal" | "final";
      modalidad: "comparsa" | "chirigota" | "coro" | "cuarteto";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
