import Swal from 'sweetalert2';

export const showSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: message,
        confirmButtonColor: '#10b981',
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showError = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: message,
        confirmButtonColor: '#ef4444',
    });
};

export const showConfirm = (title, text) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
    });
};