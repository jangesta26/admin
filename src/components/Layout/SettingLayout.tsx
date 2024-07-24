import Link from "next/link"

export function SettingLayout() {
  return (

        <>
            <Link href="#" className="font-semibold text-primary">
                Personal Information
            </Link>
            {/* <Link href="#">Security</Link> */}
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
        </>
  )
}
