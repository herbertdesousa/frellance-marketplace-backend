import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.adminContacts.createMany({
    data: [
      { icon: 'FaWhatsapp', link: '', type: 'WhatsApp', active: false },
      { icon: 'FaYoutube', link: '', type: 'YouTube', active: false },
      { icon: 'FaInstagram', link: '', type: 'Instagram', active: false },
      { icon: 'FaFacebook', link: '', type: 'Facebook', active: false },
      { icon: 'FaTiktok', link: '', type: 'TikTok', active: false },
      { icon: 'FaLinkedinIn', link: '', type: 'Linkedin', active: false },
      { icon: 'FaPinterestP', link: '', type: 'Pinterest', active: false },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
