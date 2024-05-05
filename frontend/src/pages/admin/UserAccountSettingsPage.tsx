import React, { useState } from "react";
import { EmailForm, PasswordForm, UsernameForm } from "../../components/features/UserAccountSettingsForms";

function UserAccountSettingsPage() {
  return (
    <div className="w-full container mx-auto px-4 mt-10 flex flex-col">
      <h2 className="text-2xl font-bold">Edytuj ustawienia konta</h2>
      <div className="my-3 px-4 py-5 w-full max-h-[700px] lg:w-1/2 bg-neutral-50 dark:bg-neutral-700 rounded-lg shadow-xl overflow-y-auto">
        <div className="w-full flex flex-col gap-3 xl:w-1/2">
          <UsernameForm />
          <PasswordForm />
          <EmailForm />
        </div>
      </div>
    </div>
  );
}

export default UserAccountSettingsPage;
