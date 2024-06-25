-- `todos`テーブルを作成
create table todos (
    id bigint generated by default as identity primary key, -- 自動生成されるID。主キー。
    user_id uuid references auth.users not null, -- 外部キーとして`auth.users`の`uuid`を参照。
    task text check (char_length(task) > 3), -- `task`列。文字数は3文字以上。
    is_complete boolean default false, -- 完了フラグ。デフォルトは`false`。
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null -- 挿入日時。デフォルトでUTCタイムゾーン。
);

-- `todos`テーブルに行レベルのセキュリティを有効化
alter table todos enable row level security;

-- 新しいタスクを作成するためのポリシーを作成
create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id); -- 認証ユーザーのみが自身のタスクを作成可能。

-- 自分のタスクのみを閲覧できるようにするポリシーを作成
create policy "Individuals can view their own todos." on todos for
    select using ((select auth.uid()) = user_id); -- 認証ユーザーのみが自身のタスクを閲覧可能。

-- 自分のタスクのみを更新できるようにするポリシーを作成
create policy "Individuals can update their own todos." on todos for
    update using ((select auth.uid()) = user_id); -- 認証ユーザーのみが自身のタスクを更新可能。

-- 自分のタスクのみを削除できるようにするポリシーを作成
create policy "Individuals can delete their own todos." on todos for
    delete using ((select auth.uid()) = user_id); -- 認証ユーザーのみが自身のタスクを削除可能。