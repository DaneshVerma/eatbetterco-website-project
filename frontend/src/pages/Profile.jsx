import { useEffect, useState, useMemo } from "react";
import { getMe, getUser } from "../utils/auth";

const initialsFromName = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "U";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initials = useMemo(
    () => initialsFromName(user?.name || "User"),
    [user]
  );

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        // use cached first for snappy UI
        const cached = getUser();
        if (mounted && cached) setUser(cached);
        const me = await getMe();
        if (mounted) setUser(me);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto mt-28 p-6'>
        <div className='h-10 w-48 bg-amber-200/70 animate-pulse rounded mb-6' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white border border-[#dabf82]/40 rounded-xl p-6 shadow-sm'>
            <div className='h-28 w-28 rounded-full bg-amber-200 animate-pulse mb-4' />
            <div className='h-4 w-40 bg-amber-100 animate-pulse rounded mb-2' />
            <div className='h-3 w-24 bg-amber-100 animate-pulse rounded' />
          </div>
          <div className='md:col-span-2 space-y-6'>
            <div className='bg-white border border-[#dabf82]/40 rounded-xl p-6 shadow-sm'>
              <div className='h-5 w-56 bg-amber-100 animate-pulse rounded mb-4' />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className='h-10 bg-amber-50 animate-pulse rounded'
                  />
                ))}
              </div>
            </div>
            <div className='bg-white border border-[#dabf82]/40 rounded-xl p-6 shadow-sm'>
              <div className='h-5 w-44 bg-amber-100 animate-pulse rounded mb-4' />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='h-16 bg-amber-50 animate-pulse rounded mb-3'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-6xl mx-auto mt-28 p-6'>
        <div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl'>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto mt-28 p-6'>
      {/* Page header */}
      <div className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-serif font-semibold text-[#2f2f2f]'>
          My Account
        </h1>
        <p className='text-sm text-[#6b6b6b] mt-1'>
          Manage your profile and view your activity.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left: Profile summary */}
        <aside className='bg-amber-200/60 border border-[#dabf82]/40 rounded-xl p-6 shadow-sm'>
          <div className='flex flex-col items-center text-center'>
            {/* Avatar placeholder (use an image input later) */}
            <div className='relative'>
              <div className='h-28 w-28 rounded-full bg-[#f8f5ea] border border-[#dabf82]/50 flex items-center justify-center text-3xl font-bold text-[#2f2f2f]'>
                {initials}
              </div>
              <button className='absolute -bottom-2 -right-2 text-xs px-2 py-1 rounded-lg bg-[#7a9e49] text-white shadow'>
                Change
              </button>
            </div>
            <h2 className='mt-4 text-xl font-serif font-semibold'>
              {user?.name || "Your Name"}
            </h2>
            <p className='text-sm text-[#4a4a4a]'>
              {user?.email || "you@example.com"}
            </p>
            <span className='mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#7a9e49]/10 text-[#2f2f2f] border border-[#7a9e49]/30'>
              {user?.role || "User"}
            </span>
          </div>

          {/* Quick info */}
          <div className='mt-6 grid grid-cols-1 gap-3 text-sm'>
            <div className='flex items-center justify-between bg-white border border-[#dabf82]/40 rounded-lg px-3 py-2'>
              <span className='text-[#6b6b6b]'>Member since</span>
              <span className='font-medium'>—</span>
            </div>
            <div className='flex items-center justify-between bg-white border border-[#dabf82]/40 rounded-lg px-3 py-2'>
              <span className='text-[#6b6b6b]'>Total orders</span>
              <span className='font-medium'>—</span>
            </div>
          </div>
        </aside>

        {/* Right: Details and orders */}
        <section className='md:col-span-2 space-y-6'>
          {/* Profile details (read-only for now) */}
          <div className='bg-white border border-[#dabf82]/40 rounded-xl shadow-sm overflow-hidden'>
            <div className='bg-amber-300/40 px-6 py-4 border-b border-[#dabf82]/40'>
              <h3 className="font-['Geist mono'] font-semibold text-[#2f2f2f]">
                Profile Details
              </h3>
              <p className='text-xs text-[#6b6b6b]'>
                Basic information about your account
              </p>
            </div>
            <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <div className='text-[#6b6b6b]'>Full Name</div>
                <div className='font-medium'>{user?.name || "—"}</div>
              </div>
              <div>
                <div className='text-[#6b6b6b]'>Email</div>
                <div className='font-medium'>{user?.email || "—"}</div>
              </div>
              <div>
                <div className='text-[#6b6b6b]'>Role</div>
                <div className='font-medium'>{user?.role || "—"}</div>
              </div>
              <div>
                <div className='text-[#6b6b6b]'>Phone</div>
                <div className='font-medium'>—</div>
              </div>
            </div>
          </div>

          {/* Update form (placeholder) */}
          <div className='bg-white border border-[#dabf82]/40 rounded-xl shadow-sm overflow-hidden'>
            <div className='bg-amber-300/40 px-6 py-4 border-b border-[#dabf82]/40 flex items-center justify-between'>
              <div>
                <h3 className="font-['Geist mono'] font-semibold text-[#2f2f2f]">
                  Update Profile
                </h3>
                <p className='text-xs text-[#6b6b6b]'>
                  Edit your details (coming soon)
                </p>
              </div>
              <button
                disabled
                className='text-xs px-3 py-1.5 rounded-md bg-[#d6e2c5] text-[#2f2f2f] border border-[#7a9e49]/30 cursor-not-allowed'
              >
                Save
              </button>
            </div>
            <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                disabled
                className='border border-[#dabf82]/40 rounded px-3 py-2 bg-[#f9f7ef] text-sm'
                placeholder='Full Name'
              />
              <input
                disabled
                className='border border-[#dabf82]/40 rounded px-3 py-2 bg-[#f9f7ef] text-sm'
                placeholder='Email'
              />
              <input
                disabled
                className='border border-[#dabf82]/40 rounded px-3 py-2 bg-[#f9f7ef] text-sm'
                placeholder='Phone'
              />
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full bg-amber-100 border border-[#dabf82]/40' />
                <button
                  disabled
                  className='text-xs px-3 py-1.5 rounded-md bg-[#d6e2c5] text-[#2f2f2f] border border-[#7a9e49]/30 cursor-not-allowed'
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Orders (placeholder list) */}
          <div className='bg-white border border-[#dabf82]/40 rounded-xl shadow-sm overflow-hidden'>
            <div className='bg-amber-300/40 px-6 py-4 border-b border-[#dabf82]/40 flex items-center justify-between'>
              <div>
                <h3 className="font-['Geist mono'] font-semibold text-[#2f2f2f]">
                  Recent Orders
                </h3>
                <p className='text-xs text-[#6b6b6b]'>Your last purchases</p>
              </div>
              <button className='text-xs px-3 py-1.5 rounded-md bg-[#d6e2c5] text-[#2f2f2f] border border-[#7a9e49]/30'>
                View All
              </button>
            </div>
            <div className='p-6 space-y-3'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='flex items-center justify-between bg-[#f8f5ea] border border-[#dabf82]/40 rounded-lg px-4 py-3'
                >
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 bg-amber-200 rounded-md' />
                    <div>
                      <div className='text-sm font-medium'>
                        Order #{1000 + i}
                      </div>
                      <div className='text-xs text-[#6b6b6b]'>Placed on —</div>
                    </div>
                  </div>
                  <div className='text-sm font-semibold'>—</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
