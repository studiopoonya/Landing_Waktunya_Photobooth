<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login — FotoBooth</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { brand: { DEFAULT: '#e11d48', dark: '#9f1239' } }
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-neutral-950 flex items-center justify-center px-4">

<div class="w-full max-w-sm">
    
    <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
        </div>
        <h1 class="text-2xl font-black text-white">FotoBooth Admin</h1>
        <p class="text-white/40 text-sm mt-1">Masuk ke dashboard admin</p>
    </div>

    
    <div class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">

        <?php if($errors->any()): ?>
            <div class="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl px-4 py-3">
                <?php echo e($errors->first()); ?>

            </div>
        <?php endif; ?>

        <form method="POST" action="<?php echo e(route('admin.login.post')); ?>" class="space-y-4">
            <?php echo csrf_field(); ?>

            <div>
                <label class="block text-sm text-white/60 mb-1.5">Email</label>
                <input
                    type="email"
                    name="email"
                    value="<?php echo e(old('email')); ?>"
                    required
                    placeholder="admin@fotobooth.id"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-rose-500 transition-colors"
                >
            </div>

            <div>
                <label class="block text-sm text-white/60 mb-1.5">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-rose-500 transition-colors"
                >
            </div>

            <button
                type="submit"
                class="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 mt-2"
            >
                Masuk
            </button>
        </form>
    </div>
</div>

</body>
</html>
<?php /**PATH C:\Yodi\Coding\Web_A\backend\resources\views/admin/login.blade.php ENDPATH**/ ?>