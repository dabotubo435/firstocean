create or replace function private.is_staff()
returns boolean
language plpgsql
security definer -- will run as the creator
as $$
begin
  return exists (
    select 1 from public.staffs
    where (select auth.uid()) = user_id
  );
end;
$$;

create or replace function private.is_admin()
returns boolean
language plpgsql
security definer -- will run as the creator
as $$
begin
  return exists (
    select 1 from public.staffs
    where (select auth.uid()) = user_id and is_admin = true
  );
end;
$$;