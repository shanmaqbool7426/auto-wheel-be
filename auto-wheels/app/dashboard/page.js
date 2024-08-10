import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
console.log('>>>>>>>>',session);
  if (!session) {
    return <p>You are not signed in</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
