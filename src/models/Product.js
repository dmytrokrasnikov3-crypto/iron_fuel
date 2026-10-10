export class BaseProduct {
    constructor(id, title, price, category, image, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
    }

    getFormattedPrice() {
        return `$${this.price.toFixed(2)}`;
    }
}

export class SupplementProduct extends BaseProduct {
    constructor(id, title, price, category, image, description, servingSize, servingsCount, flavor) {
        super(id, title, price, category, image, description);
        this.servingSize = servingSize;
        this.servingsCount = servingsCount;
        this.flavor = flavor;
    }

    getCostPerServing() {
        return (this.price / this.servingsCount).toFixed(2);
    }
}

export class DiscountedProduct extends BaseProduct {
    constructor(id, title, price, category, image, description, discountPercent) {
        super(id, title, price, category, image, description);
        this.discountPercent = discountPercent;
    }

    getFinalPrice() {
        return this.price * (1 - this.discountPercent / 100);
    }

    getFormattedDiscountPrice() {
        return `$${this.getFinalPrice().toFixed(2)}`;
    }
}

export class AccessoryProduct extends BaseProduct {
    constructor(id, title, price, category, image, description, material, volume) {
        super(id, title, price, category, image, description);
        this.material = material;
        this.volume = volume;
    }
}

export class User {
    constructor(id, name, email, role = 'user') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    isAdmin() {
        return this.role === 'admin';
    }
}