import { useEffect, useState } from "react";
import authService from "@/services/authService";
import toast from "react-hot-toast";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";


function Profile() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await authService.getUser();

            setUser(data);
            setFullname(data.fullname);
            setEmail(data.email);
        };

        fetchUser();
    }, []);

    const handleUpdate = async () => {
        try {
            const updatedUser = await authService.updateAccount({
                fullname,
                email,
            });

            setUser(updatedUser);
            dispatch(login(updatedUser));
         toast.success("Profile updated successfully !!");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong !!")
        }
    };

    const handlePassword = async () => {
        try {
            await authService.changePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });
              toast.success("Password updated successfully !!");

           

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong !!")
        }

        
    };

    const handleAvatar = async () => {
        if (!avatar) return;

        try {
            const updatedUser = await authService.updateAvatar(avatar);
            console.log(updatedUser);

            setUser(updatedUser);
            dispatch(login(updatedUser));
            
            toast.success("Avatar updated successfully !!");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong !!")
        }
        };
    

   return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
       <h1 className="text-5xl font-bold text-white">
        My Profile
       </h1>

       <p className="text-gray-400 mt-2">
        Manage your account information and security.
       </p>
       </div>

     
      <div
className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-10
space-y-10
shadow-2xl
">
    <div className="flex items-center gap-8">

    <img
        src={user?.avatar}
        alt=""
        className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
    />

    <div>

        <input
            type="file"
            onChange={(e)=>setAvatar(e.target.files[0])}
            className="text-white"
        />

        <button
            onClick={handleAvatar}
            className="
            mt-4
            px-5
            py-2
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-500
            text-white
            "
        >
            Update Avatar
        </button>

    </div>

</div>
</div>

<div>

<h2 className="text-xl font-semibold text-white mb-5">
Personal Details
</h2>

<div className="grid md:grid-cols-2 gap-6">

<input
value={fullname}
onChange={(e)=>setFullname(e.target.value)}
placeholder="Full Name"
className="
bg-white/10
border
border-white/20
rounded-xl
p-3
text-white
outline-none"
/>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
className="
bg-white/10
border
border-white/20
rounded-xl
p-3
text-white
outline-none"
/>

</div>

<button
onClick={handleUpdate}
className="
mt-6
bg-cyan-600
hover:bg-cyan-500
text-white
px-6
py-3
rounded-xl
">
Save Changes
</button>

</div>
<div>

<h2 className="text-xl font-semibold text-white mb-5">
Change Password
</h2>

<div className="space-y-4">

<input
type="password"
placeholder="Old Password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
/>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
/>

<button
onClick={handlePassword}
className="
bg-cyan-600
hover:bg-purple-500
text-white
px-6
py-3
rounded-xl
">
Change Password
</button>

</div>

</div>
</div>
 </div>
  );
}

export default Profile;
   