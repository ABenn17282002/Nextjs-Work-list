"use client";

import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthForm() {
  const supabase = createClientComponentClient();

  const customAppearance = {
    variables: {
      default: {
        colors: {
          brand: '#404040',
          brandAccent: '#525252',
        },
      },
    },
    style: {
      button: {
        backgroundColor: '#ffffff',
        color: '#404040',
        '&:hover': {
          backgroundColor: '#525252',
        },
      },
      input: {
        backgroundColor: '#404040',
        borderColor: '#525252',
        color: '#ffffff',
      },
    },
  };

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
      appearance={customAppearance}
    />
  );
}
