import Image from 'next/image';

export default function Logo() {
    return (
        <div className="flex justify-center items-center group cursor-pointer mb-6 z-20">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                    src="/logo.png"
                    alt="Sipster Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    priority
                />
            </div>
        </div>
    );
}
