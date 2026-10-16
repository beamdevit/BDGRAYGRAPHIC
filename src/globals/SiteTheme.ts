import type { GlobalConfig, TextField } from 'payload'
import { DEFAULT_THEME, isHexColor } from '../lib/site-theme'

const colorField = (name: keyof typeof DEFAULT_THEME, label: string, description: string): TextField => ({
  name,
  type: 'text',
  label,
  defaultValue: DEFAULT_THEME[name],
  required: true,
  validate: (value: unknown) => (isHexColor(value) ? true : 'ใส่รหัสสีแบบ #RRGGBB เช่น #016ac6'),
  admin: {
    description,
    components: { Field: '@/components/admin/ColorField#ColorField' },
  },
})

export const SiteTheme: GlobalConfig = {
  slug: 'site-theme',
  label: 'สีเว็บไซต์',
  admin: {
    group: 'ตั้งค่าเว็บไซต์',
    description: 'เลือกชุดสีสำเร็จรูปหรือปรับสีเองด้วยตัวเลือกสี แล้วกดบันทึกเพื่อเปลี่ยนสีหน้าเว็บไซต์ทันที',
  },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: 'presets',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/ColorField#ThemePresets' } },
    },
    colorField('primary', 'สีหลัก', 'ปุ่ม ลิงก์เด่น แถบหัวข้อ และพื้นหลังสีน้ำเงินของเว็บ'),
    colorField('primaryDark', 'สีหลักเข้ม', 'สีเข้มของพื้นหลังแบบไล่เฉด และสถานะ hover'),
    colorField('accent', 'สีเน้น', 'ลิงก์ตอน hover และหัวข้อเล็ก (eyebrow)'),
    colorField('ink', 'สีตัวอักษร', 'สีข้อความหลักและเส้นขอบ'),
    colorField('pageBg', 'สีพื้นหลังหน้า', 'พื้นหลังหลักของหน้าเว็บ'),
    colorField('paper', 'สีพื้นหลังรอง', 'พื้นหลังส่วนเสริม เช่น การ์ดและกล่องข้อมูล'),
  ],
}
