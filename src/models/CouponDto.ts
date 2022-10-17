/*
public string Code { get; set; }
    public bool BloggersSync { get; set; } // Sync with the bloggers coupon settings
    public bool Active { get; set; } = true;
    public Guid StoreId { get; set; }
    public Guid CouponOwnerId { get; set; }

    [Range(0, 100)] public int Discount { get; set; }

    [Range(0, 100)] public int OwnerProfit { get; set; } = 0; // To be shared with the coupon 'owner'
 */

export interface CouponDto {
  code: string;
  bloggersSync: boolean;
  active: boolean;
  storeId: string;
  couponOwnerId: string;
  discount: number;
  ownerProfit: number;
}
