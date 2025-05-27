import { MembershipTiers } from '../components/MembershipTiers'
import { CTA } from '../components/CTA'
import { PackagesHeader } from '../components/PackagesHeader'

export const Packages = () => {
  return (
    <div className="mt-10">
      <PackagesHeader />
      <MembershipTiers />
      <CTA />
    </div>
  )
}
