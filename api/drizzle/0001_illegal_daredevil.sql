CREATE TABLE "repositories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_url" text NOT NULL,
	"owner" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"default_branch" varchar(255),
	"stars" integer DEFAULT 0,
	"forks" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repository_languages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"language" varchar(100) NOT NULL,
	"percentage" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repository_analysis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"framework" varchar(100),
	"architecture" varchar(100),
	"overview" text,
	"entry_points" jsonb,
	"auth_system" text,
	"database_layer" text,
	"state_management" text,
	"generated_at" timestamp DEFAULT now()
);
