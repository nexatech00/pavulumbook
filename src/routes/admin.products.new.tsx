import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ProductForm, empty } from "@/components/admin/ProductForm";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/products/new")({
  component: NewProduct,
});

function NewProduct() {
  const qc = useQueryClient();
  return (
    <div>
      <Link to="/admin/products" className="text-sm text-charcoal/60 hover:text-terracotta">
        ← Back to products
      </Link>
      <h1 className="mt-3 font-serif text-4xl text-deep-brown">New product</h1>
      <div className="mt-8">
        <ProductForm
          initial={empty}
          submitLabel="Create product"
          onSubmit={async (values) => {
            const { error } = await supabase.from("products").insert(values);
            if (error) return { error: error.message };
            qc.invalidateQueries({ queryKey: ["products"] });
            return {};
          }}
        />
      </div>
    </div>
  );
}
