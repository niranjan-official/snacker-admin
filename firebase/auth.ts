import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './config';

export const useAuth = () => {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("useEFFECT called");
    
    if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("User: ",user);
        
        if (user) {
          console.log("User Found");
          
          setUser(user);
          localStorage.setItem('admin', JSON.stringify(user));
        } else {
          setUser(null);
          localStorage.removeItem('admin');
          localStorage.removeItem('adminData');
          router.push('/login');
        }
      });

      return () => unsubscribe();
    }
  }, [router]);

  return user;
};
