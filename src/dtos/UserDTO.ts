export type UserDTO = {
  id: number
  name: string
  email: string
  phone: string
  city: string
  creci: string
  enable_hotsite: boolean
  hotsite_with_owner_data: boolean
  sign_in_count: number
  type: string
  independent_broker: boolean
  state: string
  organization_name: string
  authorizations: {
    code: string
    accepted: boolean
    update_required: boolean
    updated_at: string
  }[]
  permissions: {
    customer_area: {
      catalog: {
        view: boolean
        edit: boolean
      }
    }
  }
}
