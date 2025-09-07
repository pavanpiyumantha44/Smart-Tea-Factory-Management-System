--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-07 13:56:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 32295)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 868 (class 1247 OID 33214)
-- Name: AttendanceStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AttendanceStatus" AS ENUM (
    'PRESENT',
    'ABSENT',
    'LEAVE',
    'HALFDAY'
);


ALTER TYPE public."AttendanceStatus" OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 33224)
-- Name: TaskStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TaskStatus" AS ENUM (
    'ASSIGNED',
    'PENDING',
    'IN_PROCESS',
    'COMPLETED',
    'CANCELLED',
    'HOLD'
);


ALTER TYPE public."TaskStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 35877)
-- Name: Solutions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Solutions" (
    "solId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    disease text,
    "Solution" text,
    "Response" text,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Solutions" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32296)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33253)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    account_id text NOT NULL,
    person_id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    last_login timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33263)
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    attendance_id text NOT NULL,
    start_dttm timestamp(3) without time zone,
    end_dttm timestamp(3) without time zone,
    status text,
    work_hours numeric(65,30) NOT NULL,
    person_id text NOT NULL,
    person_code text,
    "current_date" timestamp(3) without time zone NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    marked_by text
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 35868)
-- Name: defined_salaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defined_salaries (
    id text NOT NULL,
    role_id text NOT NULL,
    basic_salary double precision NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.defined_salaries OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33391)
-- Name: incident; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incident (
    incident_id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    resolved boolean NOT NULL,
    reported_by text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.incident OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33281)
-- Name: ot_payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ot_payment (
    ot_id text NOT NULL,
    person_id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    hours double precision NOT NULL,
    rate_per_hour double precision NOT NULL,
    total_payment double precision NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.ot_payment OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 33235)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    person_id text NOT NULL,
    person_code text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    nic_number text NOT NULL,
    email text,
    phone text,
    address text,
    gender text,
    dob timestamp(3) without time zone,
    role_id text,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33309)
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    place_id text NOT NULL,
    place_code text NOT NULL,
    description text,
    size numeric(65,30),
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.place OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33244)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id text NOT NULL,
    user_role text NOT NULL,
    description text,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 33272)
-- Name: salary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary (
    salary_id text NOT NULL,
    month timestamp(3) without time zone NOT NULL,
    basic_salary double precision,
    ot_payment double precision,
    total_salary double precision,
    "personId" text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    approved_by text,
    status text
);


ALTER TABLE public.salary OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33364)
-- Name: stock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock (
    item_id text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    unit text NOT NULL,
    unit_price double precision NOT NULL,
    quantity double precision NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.stock OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 33373)
-- Name: stock_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_transaction (
    transaction_id text NOT NULL,
    item_id text NOT NULL,
    task_id text,
    date timestamp(3) without time zone NOT NULL,
    type text NOT NULL,
    quantity double precision NOT NULL,
    reference text,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.stock_transaction OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 33299)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    task_id text NOT NULL,
    task_name text NOT NULL,
    description text NOT NULL,
    task_type text NOT NULL,
    task_status public."TaskStatus" DEFAULT 'PENDING'::public."TaskStatus" NOT NULL,
    start_date_time timestamp(3) without time zone NOT NULL,
    end_date_time timestamp(3) without time zone,
    created_by text NOT NULL,
    assigned_supervisor text NOT NULL,
    team_id text,
    worker_id text,
    place_id text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    additional_notes text,
    task_code integer NOT NULL
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 35247)
-- Name: task_task_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_task_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_task_code_seq OWNER TO postgres;

--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 234
-- Name: task_task_code_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_task_code_seq OWNED BY public.task.task_code;


--
-- TOC entry 228 (class 1259 OID 33336)
-- Name: tea_plucking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tea_plucking (
    tp_id text NOT NULL,
    "personId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    weight_kg double precision NOT NULL,
    rate_per_kg double precision NOT NULL,
    total_payment double precision NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.tea_plucking OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 33318)
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    team_id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.team OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33327)
-- Name: team_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team_member (
    team_id text NOT NULL,
    person_id text NOT NULL,
    joined_date timestamp(3) without time zone NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.team_member OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33345)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle (
    vehicle_id text NOT NULL,
    vehicle_type text NOT NULL,
    plate_number text NOT NULL,
    status text DEFAULT 'available'::text NOT NULL,
    image_url text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.vehicle OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 33355)
-- Name: vehicle_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_usage (
    usage_id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    description text NOT NULL,
    vehilce_id text NOT NULL,
    driver_id text NOT NULL,
    is_deleted text DEFAULT 'N'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.vehicle_usage OWNER TO postgres;

--
-- TOC entry 4838 (class 2604 OID 35248)
-- Name: task task_code; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN task_code SET DEFAULT nextval('public.task_task_code_seq'::regclass);


--
-- TOC entry 5091 (class 0 OID 35877)
-- Dependencies: 236
-- Data for Name: Solutions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Solutions" ("solId", date, disease, "Solution", "Response", is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5072 (class 0 OID 32296)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
19282ae7-cbaa-457b-bf1d-073e68b51dcd	a4cf098139e5c5ba3f46f02f150e7a03bf9af1d84733524a3aac46d2a8f603c0	2025-08-28 12:36:53.913727+05:30	20250828070653_initial	\N	\N	2025-08-28 12:36:53.832646+05:30	1
0d1e001d-9d69-4d96-9006-2f823162fbea	0f7f692faa6c284d45a7bed110c0d31223567efd7fe835cd25af21807dfe5404	2025-08-30 14:15:12.42629+05:30	20250830084512_email_updated	\N	\N	2025-08-30 14:15:12.422427+05:30	1
9c8f4936-c409-42cb-a330-172d8d613f14	037bce56a6993ff72bb0f18c89112d6612bc4c3094225d5beaf9b2cb29972e2c	2025-09-02 00:16:53.895502+05:30	20250901184653_updated_task_schema	\N	\N	2025-09-02 00:16:53.888757+05:30	1
f110869a-ca57-4f70-98a2-8a7e2cd56b33	86a982768a4d39ace15c4b1335709b87a5fa3ec71f2c032e89f5822d087e245a	2025-09-02 23:18:30.869599+05:30	20250902174830_updated_task_model	\N	\N	2025-09-02 23:18:30.84234+05:30	1
d70c5357-e18a-4581-b989-5dc84ddebb88	a2c1519027629fb802acd830fb6730bcd622e38a5c9106dfde23e6f3f901f7bb	2025-09-06 16:00:15.233675+05:30	20250906103015_updated_models	\N	\N	2025-09-06 16:00:15.179177+05:30	1
2ac890b7-20d0-4b6a-ad6b-c5eab5f92494	69f94ff4776d83db7766d3b12bd38eac8b7302074029db5395d800e0aec372e0	2025-09-07 01:54:04.706074+05:30	20250906202404_salary_model_update	\N	\N	2025-09-07 01:54:04.702471+05:30	1
c0fe1659-e52c-4b94-bd28-f842fc54083d	bcd6cacd8b97116930370dba76f90a981d4027706b93d1774e995c8e92f24f35	2025-09-07 13:52:46.028688+05:30	20250907082246_models_updated	\N	\N	2025-09-07 13:52:46.022949+05:30	1
\.


--
-- TOC entry 5075 (class 0 OID 33253)
-- Dependencies: 220
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (account_id, person_id, username, password, last_login, is_deleted, created_at, updated_at) FROM stdin;
fb89c3bb-ea05-4561-ad21-181dd4f44572	561416e6-5653-4fd4-8ba3-354634ad3789	sysadmin	$2b$10$g3M6qH7IGcsqAcA.h236PuZJYSoMwLyNbFdxUQbwnUyp2VyH7Jq9i	2025-08-28 07:12:58.855	N	2025-08-28 07:12:58.855	\N
a78db9af-f914-4c78-9712-b0ee672d224c	d1daf799-7d5c-416e-95ea-7c2c4f467059	mang	$2b$10$CbkFO43w4/Ad2jHArKM9nuaA8ch9D3Z/X3hY/grxRoImoc6QlvmVu	2025-09-03 14:11:21.59	N	2025-09-03 14:11:21.59	\N
9a952c07-72a2-4be4-9978-678d307dfb93	a71b34b2-7123-4829-a8e3-1b8809fd3fde	supv	$2b$10$m38P6bAIf3bdJbTxHs2pN.E3DelOZLkRrLiszgBbMuYZrqzLexNOW	2025-09-06 07:17:14.883	N	2025-09-06 07:17:14.883	\N
3cca6d20-0db9-4f26-8a6a-71807c28fbdb	474bfa4d-14bd-4902-9eff-b1362d5247e1	test	$2b$10$mH99PRx.aXfgvMh2/g0M3ewwkeDCiroj4BRCPN6EWALBH74eq.utK	2025-09-06 21:50:37.456	Y	2025-09-06 21:50:37.456	\N
\.


--
-- TOC entry 5076 (class 0 OID 33263)
-- Dependencies: 221
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (attendance_id, start_dttm, end_dttm, status, work_hours, person_id, person_code, "current_date", is_deleted, created_at, updated_at, marked_by) FROM stdin;
3510fb5e-c01a-4040-8f45-b48cc0a4d2fc	2025-09-06 18:28:36.029	2025-09-06 18:29:57.262	PRESENT	1.000000000000000000000000000000	a71b34b2-7123-4829-a8e3-1b8809fd3fde	SUP2	2025-09-05 18:30:00	N	2025-09-06 18:28:16.188	\N	\N
f05017c6-d2ae-4768-9f16-1948f0d2b5c7	\N	\N	-	0.000000000000000000000000000000	a71b34b2-7123-4829-a8e3-1b8809fd3fde	SUP2	2025-09-06 18:30:00	N	2025-09-06 18:30:06.367	\N	\N
df94fae2-a973-4c54-8f5f-e8f1b5016a37	2025-09-06 18:31:15.677	2025-09-06 18:32:09.373	HALFDAY	0.000000000000000000000000000000	474bfa4d-14bd-4902-9eff-b1362d5247e1	TEA3	2025-09-05 18:30:00	N	2025-09-06 18:28:16.188	\N	\N
22ded87c-0231-4741-b5c4-61b8b80f7aec	2025-09-06 18:31:30.462	2025-09-06 18:32:15.765	HALFDAY	0.000000000000000000000000000000	474bfa4d-14bd-4902-9eff-b1362d5247e1	TEA3	2025-09-06 18:30:00	N	2025-09-06 18:30:06.367	\N	\N
1ad36ad4-8833-403e-b038-e305cb1d506e	2025-09-06 18:31:34.837	2025-09-06 18:32:32.606	HALFDAY	0.000000000000000000000000000000	7802111f-be36-4153-930c-fe3ab00285c2	TEA4	2025-09-05 18:30:00	N	2025-09-06 18:28:16.188	\N	\N
4c2e878c-abb9-45db-bf3b-8e68a91c32fd	2025-09-06 18:31:42.469	2025-09-06 18:32:34.092	HALFDAY	0.000000000000000000000000000000	7802111f-be36-4153-930c-fe3ab00285c2	TEA4	2025-09-06 18:30:00	N	2025-09-06 18:30:06.367	\N	\N
8ada45f6-d4b2-43df-8ac1-8f770fb20b0d	2025-09-06 18:31:48.092	2025-09-06 18:32:43.269	PRESENT	0.000000000000000000000000000000	699f9d86-99b2-4e64-8c78-96b7cae61176	TEA5	2025-09-05 18:30:00	N	2025-09-06 18:28:16.188	\N	\N
6ec28c19-f77f-4167-9479-3454a7ade628	2025-09-06 18:31:51.397	2025-09-06 18:32:45.733	PRESENT	0.000000000000000000000000000000	699f9d86-99b2-4e64-8c78-96b7cae61176	TEA5	2025-09-06 18:30:00	N	2025-09-06 18:30:06.367	\N	\N
2c3701d3-4dbb-454a-84ca-7c07493c8bb8	2025-09-06 18:31:53.389	2025-09-06 18:32:56.245	PRESENT	1.000000000000000000000000000000	d1daf799-7d5c-416e-95ea-7c2c4f467059	MAN6	2025-09-05 18:30:00	N	2025-09-06 18:28:16.188	\N	\N
77307649-ea12-47cc-ba82-5703434627a2	2025-09-06 18:31:59.013	2025-09-06 18:32:59.677	PRESENT	1.000000000000000000000000000000	d1daf799-7d5c-416e-95ea-7c2c4f467059	MAN6	2025-09-06 18:30:00	N	2025-09-06 18:30:06.367	\N	\N
\.


--
-- TOC entry 5090 (class 0 OID 35868)
-- Dependencies: 235
-- Data for Name: defined_salaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defined_salaries (id, role_id, basic_salary, is_deleted, created_at, updated_at) FROM stdin;
e255179a-8fa7-4ba4-85fb-d67ae009c693	7d8feca0-6e66-46d2-8096-a81d4fb52937	50000	N	2025-09-06 20:29:50.655	\N
c370f531-e194-4f97-89e5-26b62caf5d7c	a8b7e33c-d941-4103-9f41-043953ff10b6	30000	N	2025-09-06 20:29:50.655	\N
c20c80a7-9d9c-456e-a87d-05c9814515ab	d0f7791d-5eef-4fde-9351-bb248767cfd7	20000	N	2025-09-06 20:29:50.655	\N
a7e98cf8-01e4-4395-9332-5fa739782fe9	f289ac80-c8b9-4ee8-9a25-a556c2d0448e	15000	N	2025-09-06 20:29:50.655	\N
\.


--
-- TOC entry 5088 (class 0 OID 33391)
-- Dependencies: 233
-- Data for Name: incident; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.incident (incident_id, date, type, description, resolved, reported_by, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5078 (class 0 OID 33281)
-- Dependencies: 223
-- Data for Name: ot_payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ot_payment (ot_id, person_id, date, hours, rate_per_hour, total_payment, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5073 (class 0 OID 33235)
-- Dependencies: 218
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (person_id, person_code, first_name, last_name, nic_number, email, phone, address, gender, dob, role_id, is_deleted, created_at, updated_at) FROM stdin;
561416e6-5653-4fd4-8ba3-354634ad3789	ADM1	Sys	Admin	99897787671	sysadmin@ct.com	077678676	Hatale, Kandy	M	\N	d768cac0-c6f3-43c4-898e-bb9798e96267	N	2025-08-28 07:12:17.14	\N
a71b34b2-7123-4829-a8e3-1b8809fd3fde	SUP2	Sadun	Ishara	200189288321	isharas@gmail.com	0756776675	no 22, Panwila	M	\N	a8b7e33c-d941-4103-9f41-043953ff10b6	N	2025-08-28 07:15:47.988	\N
474bfa4d-14bd-4902-9eff-b1362d5247e1	TEA3	Palitha	Siriwardana	887656453v		0756776621	No 23. Panwila	M	\N	93791f60-0330-441e-9637-e26f4708824f	N	2025-08-30 06:25:47.452	\N
7802111f-be36-4153-930c-fe3ab00285c2	TEA4	Nirmala	Amarasinghe	897865762v		0756776611	No 22, Kabaragala	F	\N	93791f60-0330-441e-9637-e26f4708824f	N	2025-08-30 08:46:56.705	\N
699f9d86-99b2-4e64-8c78-96b7cae61176	TEA5	Kamala	Gunawardhana	835676523v		0756776132	No 04, Madulkele	F	\N	93791f60-0330-441e-9637-e26f4708824f	N	2025-08-30 08:51:43.24	\N
d1daf799-7d5c-416e-95ea-7c2c4f467059	MAN6	Amal	Senarathna	935674562v	amal@gmail.com	0756776311	no 33, panwila	M	\N	7d8feca0-6e66-46d2-8096-a81d4fb52937	N	2025-09-02 16:01:07.783	\N
\.


--
-- TOC entry 5080 (class 0 OID 33309)
-- Dependencies: 225
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (place_id, place_code, description, size, is_deleted, created_at, updated_at) FROM stdin;
aff3e962-ee64-4f52-984d-042774fca182	B22	B22 Area	10.000000000000000000000000000000	N	2025-08-30 11:53:16.011	\N
b5c005c9-5b43-42b7-892c-4fb9d4ba5d3a	A21	A21 Section	25.000000000000000000000000000000	N	2025-08-31 14:51:10.402	\N
\.


--
-- TOC entry 5074 (class 0 OID 33244)
-- Dependencies: 219
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (role_id, user_role, description, is_deleted, created_at, updated_at) FROM stdin;
d768cac0-c6f3-43c4-898e-bb9798e96267	ADMIN	Admin	N	2025-08-28 07:08:03.551	\N
7d8feca0-6e66-46d2-8096-a81d4fb52937	MANAGER	Manager	N	2025-08-28 07:08:03.551	\N
a8b7e33c-d941-4103-9f41-043953ff10b6	SUPERVISOR	Supervisor	N	2025-08-28 07:08:03.551	\N
93791f60-0330-441e-9637-e26f4708824f	TEA-PLUCKER	Tea Plucker	N	2025-08-28 07:08:03.551	\N
f289ac80-c8b9-4ee8-9a25-a556c2d0448e	CLEANER	Cleaner	N	2025-08-28 07:08:03.551	\N
d0f7791d-5eef-4fde-9351-bb248767cfd7	SECURITY	Security	N	2025-08-28 07:08:03.551	\N
\.


--
-- TOC entry 5077 (class 0 OID 33272)
-- Dependencies: 222
-- Data for Name: salary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salary (salary_id, month, basic_salary, ot_payment, total_salary, "personId", is_deleted, created_at, updated_at, approved_by, status) FROM stdin;
ec0a6079-a9ab-499a-8181-4d1b58adc699	2025-09-06 18:30:00	1240	0	1240	699f9d86-99b2-4e64-8c78-96b7cae61176	N	2025-09-07 08:13:25.368	\N	561416e6-5653-4fd4-8ba3-354634ad3789	\N
3288ad08-9e6c-4820-bc62-52542a808a4d	2025-09-06 18:30:00	1776	0	1776	474bfa4d-14bd-4902-9eff-b1362d5247e1	N	2025-09-07 08:17:13.714	\N	561416e6-5653-4fd4-8ba3-354634ad3789	\N
0ab1bf9e-6bec-4072-9242-988bd4605d01	2025-09-06 18:30:00	30000	0	30000	a71b34b2-7123-4829-a8e3-1b8809fd3fde	N	2025-09-07 08:20:49.875	\N	561416e6-5653-4fd4-8ba3-354634ad3789	\N
\.


--
-- TOC entry 5086 (class 0 OID 33364)
-- Dependencies: 231
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock (item_id, name, category, unit, unit_price, quantity, is_deleted, created_at, updated_at) FROM stdin;
b6d653b9-f0b1-4752-a2f4-6c1c78dc0af1	Black Tea	TEA	kg	70	300	N	2025-08-29 19:19:30.489	\N
1168fe2b-118f-4ddc-b35e-9cbe0395c1fd	Petrol	FUEL	l	310	300	N	2025-08-29 19:20:12.039	\N
f969d4ff-2716-4535-8edd-09f77bf4a490	Rake	TOOLS		8000	20	N	2025-08-29 19:20:33.631	\N
cfb13e71-a592-4d42-86db-f7aad95bc4b5	Diesel	FUEL	l	331	400	N	2025-08-29 19:20:51.285	2025-08-29 19:21:57.935
d715851c-c47a-4eea-a786-777493601eba	T01 New	FERTILIZER	kg	300	200	N	2025-09-03 09:07:17.193	2025-09-03 09:11:29.711
\.


--
-- TOC entry 5087 (class 0 OID 33373)
-- Dependencies: 232
-- Data for Name: stock_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock_transaction (transaction_id, item_id, task_id, date, type, quantity, reference, is_deleted, created_at, updated_at) FROM stdin;
c1a7af0b-df1b-4c73-921a-b8ff91a00e12	f969d4ff-2716-4535-8edd-09f77bf4a490	11	2025-08-31 16:31:09.042	TOOL	3	Clean A21 Tea Area	N	2025-08-31 16:31:09.11	\N
2c487b7c-674e-47a3-8872-6a531fc56cd7	f969d4ff-2716-4535-8edd-09f77bf4a490	9c6b665a-c6b4-493b-9969-0a43e6f6da21	2025-09-02 21:15:26.523	OUT	2	\N	N	2025-09-02 21:15:26.525	\N
2ff53df8-d695-4568-abc5-9aff5377501d	f969d4ff-2716-4535-8edd-09f77bf4a490	ce6a2e63-aca0-4c8a-8aee-acbcf9502ae3	2025-09-03 14:52:59.981	OUT	5	\N	N	2025-09-03 14:52:59.984	\N
e99bc65a-efb7-493c-8d66-acf3516d7d81	d715851c-c47a-4eea-a786-777493601eba	ce6a2e63-aca0-4c8a-8aee-acbcf9502ae3	2025-09-03 14:52:59.981	OUT	3	\N	N	2025-09-03 14:52:59.984	\N
\.


--
-- TOC entry 5079 (class 0 OID 33299)
-- Dependencies: 224
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (task_id, task_name, description, task_type, task_status, start_date_time, end_date_time, created_by, assigned_supervisor, team_id, worker_id, place_id, is_deleted, created_at, updated_at, additional_notes, task_code) FROM stdin;
5e8f17c3-ab87-4465-b18e-c7b1fa12c89b	Clean A21	Clean A21 Section	CLEANING	ASSIGNED	2025-09-03 00:00:00	\N	d1daf799-7d5c-416e-95ea-7c2c4f467059	a71b34b2-7123-4829-a8e3-1b8809fd3fde	b6f8d736-49ed-4aa8-b500-ade1ff29eefe	\N	b5c005c9-5b43-42b7-892c-4fb9d4ba5d3a	N	2025-09-03 09:40:27.619	2025-09-06 11:56:59.96	\N	6
8b65af0b-65b0-40c9-97bb-2ef9b332cdf3	Clean Area	Clean Upper division of section B22	CLEANING	PENDING	2025-09-17 00:00:00	\N	d1daf799-7d5c-416e-95ea-7c2c4f467059	a71b34b2-7123-4829-a8e3-1b8809fd3fde	b6f8d736-49ed-4aa8-b500-ade1ff29eefe	\N	aff3e962-ee64-4f52-984d-042774fca182	N	2025-09-02 20:21:47.004	2025-09-06 12:00:04.134	\N	3
10d327da-15f5-4a4d-843d-ddf220310896	Fertilizing Plants	Fertilizing Section A21 	FERTILIZING	COMPLETED	2025-09-02 00:00:00	\N	d1daf799-7d5c-416e-95ea-7c2c4f467059	a71b34b2-7123-4829-a8e3-1b8809fd3fde	ad271222-1127-4e8b-9638-a31cd55b2a72	\N	b5c005c9-5b43-42b7-892c-4fb9d4ba5d3a	N	2025-09-02 17:55:58.671	2025-09-06 12:06:11.725	\N	2
fd2810d7-9a55-4ab0-b390-e0b9cc92ced8	Tea Plucking	Tea Plucking on section B22	TEA-PLUCKING	PENDING	2025-09-02 00:00:00	\N	d1daf799-7d5c-416e-95ea-7c2c4f467059	a71b34b2-7123-4829-a8e3-1b8809fd3fde	ad271222-1127-4e8b-9638-a31cd55b2a72	\N	aff3e962-ee64-4f52-984d-042774fca182	N	2025-09-01 19:10:30.957	2025-09-06 12:08:13.668	\N	1
ce6a2e63-aca0-4c8a-8aee-acbcf9502ae3	Test Task	This is a test task	DAILY	COMPLETED	2025-09-03 14:52:59.45	\N	d1daf799-7d5c-416e-95ea-7c2c4f467059	a71b34b2-7123-4829-a8e3-1b8809fd3fde	ad271222-1127-4e8b-9638-a31cd55b2a72	a71b34b2-7123-4829-a8e3-1b8809fd3fde	aff3e962-ee64-4f52-984d-042774fca182	N	2025-09-03 14:52:59.936	2025-09-06 12:47:58.713	\N	9
\.


--
-- TOC entry 5083 (class 0 OID 33336)
-- Dependencies: 228
-- Data for Name: tea_plucking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tea_plucking (tp_id, "personId", date, weight_kg, rate_per_kg, total_payment, is_deleted, created_at, updated_at) FROM stdin;
3d4aab9e-b129-4910-a002-09811ef9a73d	474bfa4d-14bd-4902-9eff-b1362d5247e1	2025-08-30 00:00:00	18	70	1260	N	2025-08-30 09:33:33.238	\N
3ff8f2ce-d63b-486b-bb99-c3fa62d9691e	7802111f-be36-4153-930c-fe3ab00285c2	2025-08-30 00:00:00	20.05	70	1403.5	N	2025-08-30 09:33:33.282	\N
5a725167-4d3d-4317-8d4e-0802e1f9c214	699f9d86-99b2-4e64-8c78-96b7cae61176	2025-08-30 00:00:00	17.75	70	1242.5	N	2025-08-30 09:33:33.287	\N
79b7a054-419c-4f2e-a805-cccb7afdbd18	474bfa4d-14bd-4902-9eff-b1362d5247e1	2025-08-31 00:00:00	22.4	75	1680	N	2025-08-31 11:08:20.063	\N
447dcb69-4663-44b6-b9d6-8fe57acfd6e0	7802111f-be36-4153-930c-fe3ab00285c2	2025-08-31 00:00:00	12.2	75	915	N	2025-08-31 11:08:20.11	\N
90af156b-c2ec-466f-b20a-a4abcbef8ef8	699f9d86-99b2-4e64-8c78-96b7cae61176	2025-08-31 00:00:00	10.2	75	765	N	2025-08-31 11:08:20.116	\N
a714bcd4-1d61-42e0-8343-ed96818c5bac	474bfa4d-14bd-4902-9eff-b1362d5247e1	2025-09-07 00:00:00	22.2	80	1776	N	2025-09-07 07:04:13.412	\N
0dd71960-9cbb-4f07-bba5-ca4e1f1a7ad6	7802111f-be36-4153-930c-fe3ab00285c2	2025-09-07 00:00:00	20	80	1600	N	2025-09-07 07:04:13.456	\N
92a14c24-f320-48a9-b37c-cb44b91e0d12	699f9d86-99b2-4e64-8c78-96b7cae61176	2025-09-07 00:00:00	15.5	80	1240	N	2025-09-07 07:04:13.462	\N
\.


--
-- TOC entry 5081 (class 0 OID 33318)
-- Dependencies: 226
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team (team_id, name, description, is_deleted, created_at, updated_at) FROM stdin;
ad271222-1127-4e8b-9638-a31cd55b2a72	TEA-PLUCKING	Tea Plucking	N	2025-08-28 07:40:19.122	\N
0d9204dc-09f0-47e3-8973-b790ea9bf7d0	SUPERVISORS	Supervisors	N	2025-08-28 07:40:31.505	\N
b3a2c46b-a115-4a82-8809-008cb95d5dd0	MANAGERS	Managers	N	2025-08-28 07:40:39.44	\N
4c039646-52b5-4a84-b68a-659d108df2fc	DRIVERS	Drivers	N	2025-08-28 07:40:47.977	\N
b6f8d736-49ed-4aa8-b500-ade1ff29eefe	CLEANERS	Cleaners	N	2025-08-28 07:41:11.129	\N
\.


--
-- TOC entry 5082 (class 0 OID 33327)
-- Dependencies: 227
-- Data for Name: team_member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team_member (team_id, person_id, joined_date, is_deleted, created_at, updated_at) FROM stdin;
0d9204dc-09f0-47e3-8973-b790ea9bf7d0	a71b34b2-7123-4829-a8e3-1b8809fd3fde	2025-08-28 00:00:00	N	2025-08-28 07:55:18.823	\N
\.


--
-- TOC entry 5084 (class 0 OID 33345)
-- Dependencies: 229
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle (vehicle_id, vehicle_type, plate_number, status, image_url, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5085 (class 0 OID 33355)
-- Dependencies: 230
-- Data for Name: vehicle_usage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle_usage (usage_id, date, description, vehilce_id, driver_id, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 234
-- Name: task_task_code_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_task_code_seq', 9, true);


--
-- TOC entry 4908 (class 2606 OID 35885)
-- Name: Solutions Solutions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Solutions"
    ADD CONSTRAINT "Solutions_pkey" PRIMARY KEY ("solId");


--
-- TOC entry 4863 (class 2606 OID 32304)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4873 (class 2606 OID 33262)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- TOC entry 4876 (class 2606 OID 33271)
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (attendance_id);


--
-- TOC entry 4906 (class 2606 OID 35876)
-- Name: defined_salaries defined_salaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defined_salaries
    ADD CONSTRAINT defined_salaries_pkey PRIMARY KEY (id);


--
-- TOC entry 4904 (class 2606 OID 33399)
-- Name: incident incident_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_pkey PRIMARY KEY (incident_id);


--
-- TOC entry 4880 (class 2606 OID 33289)
-- Name: ot_payment ot_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ot_payment
    ADD CONSTRAINT ot_payment_pkey PRIMARY KEY (ot_id);


--
-- TOC entry 4867 (class 2606 OID 33243)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (person_id);


--
-- TOC entry 4885 (class 2606 OID 33317)
-- Name: place place_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (place_id);


--
-- TOC entry 4869 (class 2606 OID 33252)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4878 (class 2606 OID 33280)
-- Name: salary salary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary
    ADD CONSTRAINT salary_pkey PRIMARY KEY (salary_id);


--
-- TOC entry 4900 (class 2606 OID 33372)
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4902 (class 2606 OID 33381)
-- Name: stock_transaction stock_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_transaction
    ADD CONSTRAINT stock_transaction_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 4882 (class 2606 OID 33308)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);


--
-- TOC entry 4893 (class 2606 OID 33344)
-- Name: tea_plucking tea_plucking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tea_plucking
    ADD CONSTRAINT tea_plucking_pkey PRIMARY KEY (tp_id);


--
-- TOC entry 4891 (class 2606 OID 33335)
-- Name: team_member team_member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_pkey PRIMARY KEY (team_id, person_id);


--
-- TOC entry 4889 (class 2606 OID 33326)
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (team_id);


--
-- TOC entry 4895 (class 2606 OID 33354)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 4898 (class 2606 OID 33363)
-- Name: vehicle_usage vehicle_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_usage
    ADD CONSTRAINT vehicle_usage_pkey PRIMARY KEY (usage_id);


--
-- TOC entry 4871 (class 1259 OID 33404)
-- Name: account_person_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX account_person_id_key ON public.account USING btree (person_id);


--
-- TOC entry 4874 (class 1259 OID 33405)
-- Name: account_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX account_username_key ON public.account USING btree (username);


--
-- TOC entry 4864 (class 1259 OID 33401)
-- Name: person_nic_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX person_nic_number_key ON public.person USING btree (nic_number);


--
-- TOC entry 4865 (class 1259 OID 33400)
-- Name: person_person_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX person_person_code_key ON public.person USING btree (person_code);


--
-- TOC entry 4886 (class 1259 OID 33406)
-- Name: place_place_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX place_place_code_key ON public.place USING btree (place_code);


--
-- TOC entry 4870 (class 1259 OID 33403)
-- Name: role_user_role_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX role_user_role_key ON public.role USING btree (user_role);


--
-- TOC entry 4883 (class 1259 OID 35255)
-- Name: task_task_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX task_task_code_key ON public.task USING btree (task_code);


--
-- TOC entry 4887 (class 1259 OID 33407)
-- Name: team_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX team_name_key ON public.team USING btree (name);


--
-- TOC entry 4896 (class 1259 OID 33408)
-- Name: vehicle_plate_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX vehicle_plate_number_key ON public.vehicle USING btree (plate_number);


--
-- TOC entry 4910 (class 2606 OID 33414)
-- Name: account account_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4911 (class 2606 OID 33419)
-- Name: attendance attendance_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4926 (class 2606 OID 35886)
-- Name: defined_salaries defined_salaries_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defined_salaries
    ADD CONSTRAINT defined_salaries_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4925 (class 2606 OID 33494)
-- Name: incident incident_reported_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incident
    ADD CONSTRAINT incident_reported_by_fkey FOREIGN KEY (reported_by) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4913 (class 2606 OID 33429)
-- Name: ot_payment ot_payment_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ot_payment
    ADD CONSTRAINT ot_payment_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4909 (class 2606 OID 33409)
-- Name: person person_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4912 (class 2606 OID 33424)
-- Name: salary salary_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary
    ADD CONSTRAINT "salary_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4924 (class 2606 OID 33489)
-- Name: stock_transaction stock_transaction_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_transaction
    ADD CONSTRAINT stock_transaction_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.stock(item_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4914 (class 2606 OID 33444)
-- Name: task task_assigned_supervisor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_assigned_supervisor_fkey FOREIGN KEY (assigned_supervisor) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4915 (class 2606 OID 33439)
-- Name: task task_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4916 (class 2606 OID 33459)
-- Name: task task_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.place(place_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4917 (class 2606 OID 34650)
-- Name: task task_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(team_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4918 (class 2606 OID 34645)
-- Name: task task_worker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4921 (class 2606 OID 33474)
-- Name: tea_plucking tea_plucking_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tea_plucking
    ADD CONSTRAINT "tea_plucking_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4919 (class 2606 OID 33469)
-- Name: team_member team_member_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4920 (class 2606 OID 33464)
-- Name: team_member team_member_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_member
    ADD CONSTRAINT team_member_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(team_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4922 (class 2606 OID 33484)
-- Name: vehicle_usage vehicle_usage_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_usage
    ADD CONSTRAINT vehicle_usage_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4923 (class 2606 OID 33479)
-- Name: vehicle_usage vehicle_usage_vehilce_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_usage
    ADD CONSTRAINT vehicle_usage_vehilce_id_fkey FOREIGN KEY (vehilce_id) REFERENCES public.vehicle(vehicle_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-09-07 13:56:27

--
-- PostgreSQL database dump complete
--

