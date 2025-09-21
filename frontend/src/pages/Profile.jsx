import { useEffect, useState } from "react";
import { getMe, getUser } from "../utils/auth";

const Profile = () => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const me = await getMe();
        if (mounted) setUser(me);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (!user) load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className='max-w-3xl mx-auto mt-28 p-8 bg-white shadow rounded'>
        <div className='animate-pulse h-6 w-40 bg-amber-200 rounded mb-6' />
        <div className='animate-pulse h-4 w-64 bg-amber-100 rounded mb-3' />
        <div className='animate-pulse h-4 w-48 bg-amber-100 rounded' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto mt-28 p-8 bg-white shadow rounded text-red-600'>
        {error}
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto mt-28 p-6'>
      <div className='bg-amber-200/70 border border-[#dabf82]/40 rounded-xl shadow-sm overflow-hidden'>
        <div className='bg-amber-300/60 px-6 py-5 border-b border-[#dabf82]/40'>
          <h1 className='text-2xl font-serif font-semibold text-[#2f2f2f]'>
            My Profile
          </h1>
          <p className='text-sm text-[#4a4a4a] mt-1'>
            Manage your account details
          </p>
        </div>
        <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg shadow p-5 border border-[#dabf82]/40'>
            <h2 className="font-['Geist mono'] font-semibold text-[#2f2f2f] mb-4">
              Account
            </h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-[#6b6b6b]'>Name</span>
                <span className='font-medium'>{user?.name}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[#6b6b6b]'>Email</span>
                <span className='font-medium'>{user?.email}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[#6b6b6b]'>Role</span>
                <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#7a9e49]/10 text-[#2f2f2f] border border-[#7a9e49]/30'>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-5 border border-[#dabf82]/40'>
            <h2 className="font-['Geist mono'] font-semibold text-[#2f2f2f] mb-4">
              Security
            </h2>
            <p className='text-sm text-[#6b6b6b]'>
              Your account is protected with a JSON Web Token while browsing.
            </p>
            <div className='mt-4 text-xs text-[#6b6b6b]'>
              Tip: Use the Logout button in the navbar to end your session
              securely.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
