API update: truyền những field cần update thôi

role: renter, owner

schema:
account:{
    gmail,
    phone,
    image_url,
    name,
    address_line1,
    address_line2,
    dob,
    is_new,
    is_private,
    is_owner,
    is_renter,
    amount_spent
};
post:{
    author,
    title,
    description,
    price,
    area,
    list_image_url,
    address,
    time_created,
    comments:[],
    is_active,
    view_counts
};
favorite-post:{
    renter_id,
    post_id,
    image_url,
    title,
    description
};
book-schedules:{
    post_id,
    address,
    owner_id,
    owner_name,
    renter_id,
    renter_name,
    time,
    status: not_confirm,confirmed,done,cancel
};
config-app:{
    discount_newbie:,
    discount_vip,
    price_every_post,
}

