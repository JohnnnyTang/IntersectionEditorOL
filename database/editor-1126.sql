PGDMP                  
    |         
   cross_edit    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    38653 
   cross_edit    DATABASE     �   CREATE DATABASE cross_edit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Simplified)_China.936';
    DROP DATABASE cross_edit;
                postgres    false                        3079    38654    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                   false            �           0    0    EXTENSION postgis    COMMENT     ^   COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
                        false    2                        3079    39744 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    3            �            1259    39737    users    TABLE     �   CREATE TABLE public.users (
    uid uuid NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(128) NOT NULL,
    password character varying(64) NOT NULL,
    tasks integer[],
    role character varying(16) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    38972    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    218          �          0    39737    users 
   TABLE DATA           H   COPY public.users (uid, name, email, password, tasks, role) FROM stdin;
    public          postgres    false    222   +       �           2606    39743    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    222            �      x������ � �      �   Z   x����  м�̲r����©`����W�(���c���\-w�G�b���q����_ �j�$9��i4 ����=�y�� FS     