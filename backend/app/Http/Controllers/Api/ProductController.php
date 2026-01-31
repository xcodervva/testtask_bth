<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET /api/products
     */
    public function index(Request $request)
    {
        $query = Product::query()
            ->with('category')
            ->orderByDesc('created_at');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->paginate(10);

        return ProductResource::collection($products);
    }

    /**
     * GET /api/products/{id}
     */
    public function show(int $id)
    {
        $product = Product::with('category')->find($id);

        if (! $product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        return new ProductResource($product);
    }

    /**
     * POST /api/products
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        return new ProductResource(
            $product->load('category')
        );
    }

    /**
     * PUT/PATCH /api/products/{id}
     */
    public function update(UpdateProductRequest $request, int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $product->update($request->validate());

        return new ProductResource(
            $product->load('category')
        );
    }

    /**
     * DELETE /api/products/{id}
     */
    public function destroy(int $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->noContent();
    }
}
