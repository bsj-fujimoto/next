# React コーディングガイドライン

## 目次
1. [コンポーネント設計](#コンポーネント設計)
2. [Hooks の使用](#hooks-の使用)
3. [パフォーマンス最適化](#パフォーマンス最適化)
4. [型安全性](#型安全性)
5. [状態管理](#状態管理)
6. [アンチパターン](#アンチパターン)

---

## コンポーネント設計

### ✅ Good Practices

#### 単一責任の原則
```tsx
// Good: 1つの責任を持つ小さなコンポーネント
function UserAvatar({ user }: { user: User }) {
  return <img src={user.avatar} alt={user.name} />;
}

function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <UserAvatar user={user} />
      <h2>{user.name}</h2>
    </div>
  );
}
```

#### Props の型定義
```tsx
// Good: 明示的な型定義
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button {...props} />;
}
```

#### コンポーネントの合成
```tsx
// Good: 合成可能な設計
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div className="card-body">{children}</div>
);

// 使用例
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### ❌ Bad Practices

```tsx
// Bad: 複数の責任を持つ巨大なコンポーネント
function Dashboard() {
  // 500行以上のコード
  // データフェッチ、状態管理、UI、ビジネスロジックすべて含む
}

// Bad: Props の型定義がない
function Button(props) {
  return <button {...props} />;
}

// Bad: any を使用
function Component({ data }: { data: any }) {
  return <div>{data.value}</div>;
}
```

---

## Hooks の使用

### ✅ Good Practices

#### useEffect の依存配列
```tsx
// Good: 依存配列を正しく指定
function Component({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // userId が変更されたときのみ実行

  return <div>{user?.name}</div>;
}
```

#### Custom Hooks の活用
```tsx
// Good: ロジックを Custom Hook に分離
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  return { isAuthenticated };
}

// コンポーネントはシンプルに
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Login />;
}
```

#### useMemo / useCallback の適切な使用
```tsx
// Good: 高コストな計算を useMemo でメモ化
function DataTable({ data }: { data: Item[] }) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return <table>{/* ... */}</table>;
}

// Good: コールバックを useCallback でメモ化（子コンポーネントに渡す場合）
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // 依存なし

  return <ChildComponent onClick={handleClick} />;
}
```

### ❌ Bad Practices

```tsx
// Bad: 依存配列を空にして useEffect が更新されない
function Component({ userId }: { userId: string }) {
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // userId の変更が反映されない
}

// Bad: useEffect 内で直接状態を更新（無限ループ）
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // 無限ループ！
  });
}

// Bad: 不要な useMemo / useCallback
function Component() {
  const value = useMemo(() => 1 + 1, []); // 単純な計算には不要
  const handleClick = useCallback(() => {}, []); // 子コンポーネントに渡さない場合は不要
}
```

---

## パフォーマンス最適化

### ✅ Good Practices

#### リストのキー
```tsx
// Good: 一意で安定したキーを使用
function List({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

#### React.memo の使用
```tsx
// Good: props が変わらない限り再レンダリングしない
const ExpensiveComponent = React.memo(({ data }: { data: Data }) => {
  return <div>{/* 高コストな描画 */}</div>;
});
```

#### 仮想化（Virtualization）
```tsx
// Good: 大量のリストを仮想化
import { FixedSizeList } from 'react-window';

function LargeList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

### ❌ Bad Practices

```tsx
// Bad: インデックスをキーに使用
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// Bad: 毎回新しいオブジェクトや関数を生成
function Component() {
  return <Child style={{ margin: 10 }} onClick={() => {}} />; // 毎回再生成
}

// Bad: 不要な状態の保持
function Component() {
  const [data, setData] = useState(props.data); // props から派生する状態は不要
}
```

---

## 型安全性

### ✅ Good Practices

#### ジェネリック型の活用
```tsx
// Good: ジェネリック型で型安全性を確保
interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) {
  return (
    <table>
      {data.map((item, i) => (
        <tr key={i}>
          {columns.map((col) => (
            <td key={String(col.key)}>{String(item[col.key])}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}
```

#### Union Types の使用
```tsx
// Good: Union Types で限定された値のみ受け入れる
type Status = 'success' | 'pending' | 'failed';

interface StatusBadgeProps {
  status: Status;
  children: React.ReactNode;
}
```

### ❌ Bad Practices

```tsx
// Bad: any の使用
function Component({ data }: { data: any }) {
  return <div>{data.value}</div>;
}

// Bad: 型アサーション as any の乱用
const value = (data as any).unknownProperty;

// Bad: オプショナルチェーンの乱用（型定義が不正確）
function Component({ data }: { data?: any }) {
  return <div>{data?.value?.nested?.property}</div>;
}
```

---

## 状態管理

### ✅ Good Practices

#### ローカル状態 vs グローバル状態
```tsx
// Good: ローカルな状態はコンポーネント内に
function Counter() {
  const [count, setCount] = useState(0); // ローカル状態
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Good: 共有する状態は Context や状態管理ライブラリで
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### 状態の正規化
```tsx
// Good: 正規化された状態
interface State {
  items: Record<string, Item>;
  itemIds: string[];
}

// Bad: 非正規化された状態（重複データ）
interface State {
  items: Item[];
  selectedItem: Item; // items と重複
}
```

### ❌ Bad Practices

```tsx
// Bad: すべての状態をグローバルに
const GlobalState = createContext<any>(null);

// Bad: 派生状態を useState で管理
function Component({ items }: { items: Item[] }) {
  const [count, setCount] = useState(items.length); // items.length で十分
}

// Bad: 不必要な状態の分割
function Component() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // { firstName, lastName } の1つの状態で十分
}
```

---

## アンチパターン

### 1. Prop Drilling（過度なプロップの受け渡し）

```tsx
// Bad: 深いネストでプロップを渡し続ける
function App() {
  const [user, setUser] = useState<User | null>(null);
  return <Parent user={user} setUser={setUser} />;
}

function Parent({ user, setUser }) {
  return <Child user={user} setUser={setUser} />;
}

function Child({ user, setUser }) {
  return <GrandChild user={user} setUser={setUser} />;
}

// Good: Context を使用
const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Parent />
    </UserContext.Provider>
  );
}

function GrandChild() {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
}
```

### 2. 直接の DOM 操作

```tsx
// Bad: DOM を直接操作
function Component() {
  useEffect(() => {
    document.getElementById('my-element').innerHTML = 'Hello';
  }, []);
  return <div id="my-element"></div>;
}

// Good: React の状態で管理
function Component() {
  const [text, setText] = useState('Hello');
  return <div>{text}</div>;
}
```

### 3. useEffect の誤用

```tsx
// Bad: useEffect で同期的な処理
function Component({ value }: { value: number }) {
  const [doubled, setDoubled] = useState(0);

  useEffect(() => {
    setDoubled(value * 2); // 不要な useEffect
  }, [value]);

  return <div>{doubled}</div>;
}

// Good: 派生値は計算で求める
function Component({ value }: { value: number }) {
  const doubled = value * 2;
  return <div>{doubled}</div>;
}
```

### 4. インラインオブジェクト・関数の定義

```tsx
// Bad: 毎回新しいオブジェクトが生成される
function Parent() {
  return <Child style={{ margin: 10 }} onClick={() => {}} />;
}

// Good: 外で定義またはメモ化
const style = { margin: 10 };

function Parent() {
  const handleClick = useCallback(() => {}, []);
  return <Child style={style} onClick={handleClick} />;
}
```

### 5. ビジネスロジックとUIの混在

```tsx
// Bad: コンポーネント内にビジネスロジック
function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        // 複雑なデータ変換ロジック
        const processed = data.map(u => ({
          ...u,
          fullName: `${u.firstName} ${u.lastName}`,
          age: calculateAge(u.birthDate),
        }));
        setUsers(processed);
      });
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.fullName}</li>)}</ul>;
}

// Good: ロジックを Custom Hook に分離
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAndProcessUsers().then(setUsers);
  }, []);

  return users;
}

function UserList() {
  const users = useUsers();
  return <ul>{users.map(u => <li key={u.id}>{u.fullName}</li>)}</ul>;
}
```

---

## チェックリスト

### コンポーネント
- [ ] 単一責任の原則に従っているか
- [ ] Props に明示的な型定義があるか
- [ ] コンポーネントは再利用可能か
- [ ] 200行以内に収まっているか

### Hooks
- [ ] useEffect の依存配列は正しいか
- [ ] Custom Hook でロジックを分離しているか
- [ ] useMemo/useCallback は適切に使用されているか

### パフォーマンス
- [ ] リストのキーは一意で安定しているか
- [ ] 不要な再レンダリングを防いでいるか
- [ ] 大量データの場合は仮想化を検討しているか

### 型安全性
- [ ] any を使用していないか
- [ ] Union Types やジェネリック型を活用しているか
- [ ] 型アサーションは最小限か

### 状態管理
- [ ] ローカル状態とグローバル状態を適切に分けているか
- [ ] 派生状態を useState で管理していないか
- [ ] Prop Drilling を避けているか
