import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'DELETE');
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  const path = pathSegments.join('/');
  const url = `${API_BASE_URL}/${path}`;

  // Get cookies from request
  const cookies = request.cookies.getAll();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  const contentType = request.headers.get('content-type');
  const isMultipart = contentType?.includes('multipart/form-data');

  console.log('Proxy Request:', {
    path,
    method,
    contentType,
    isMultipart,
    hasCookies: !!cookieHeader,
  });

  const headers: Record<string, string> = {};

  if (cookieHeader) {
    headers['Cookie'] = cookieHeader;
  }

  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  let body: BodyInit | undefined;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    if (isMultipart) {
      try {
        body = await request.formData();
      } catch (e) {
        console.error('Failed to parse FormData:', e);
      }
    } else {
      try {
        const json = await request.json();
        body = JSON.stringify(json);
      } catch (e) {
      }
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const contentDisposition = response.headers.get('content-disposition');
    const isFileDownload = contentDisposition && contentDisposition.includes('attachment');

    console.log('Proxy Response:', {
      path,
      status: response.status,
      hasSetCookie: response.headers.has('set-cookie'),
      isFileDownload,
      contentDisposition,
    });

    if (isFileDownload) {
      const blob = await response.blob();
      
      const nextResponse = new NextResponse(blob, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
          'Content-Disposition': contentDisposition,
        },
      });

      return nextResponse;
    }

    const data = await response.json().catch(() => null);

    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
