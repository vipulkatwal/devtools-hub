import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Copy, Clock, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const JwtDecoder = () => {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null);

  const decodeToken = () => {
    try {
      setError(null);
      if (!token.trim()) {
        throw new Error('Please enter a JWT token');
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Token must have three parts separated by dots.');
      }

      const decoded = {
        header: JSON.parse(atob(parts[0])),
        payload: JSON.parse(atob(parts[1])),
        signature: parts[2]
      };

      // Check expiration
      if (decoded.payload.exp) {
        const expirationDate = new Date(decoded.payload.exp * 1000);
        decoded.isExpired = expirationDate < new Date();
        decoded.expirationDate = expirationDate;
      }

      setDecodedToken(decoded);
    } catch (err) {
      setError(err.message);
      setDecodedToken(null);
    }
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    toast.success(`Copied ${section} to clipboard`);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">JWT Decoder</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enter JWT Token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Paste your JWT token here..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono"
            />
            <Button onClick={decodeToken}>Decode</Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {decodedToken && (
        <>
          {decodedToken.isExpired && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                This token has expired on {decodedToken.expirationDate.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Header
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(decodedToken.header, 'header')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary/50 p-4 rounded-lg overflow-auto max-h-[300px]">
                  {JSON.stringify(decodedToken.header, null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payload
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(decodedToken.payload, 'payload')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <pre className="bg-secondary/50 p-4 rounded-lg overflow-auto max-h-[300px]">
                    {JSON.stringify(decodedToken.payload, null, 2)}
                  </pre>

                  {decodedToken.payload.exp && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Expires: {formatDate(decodedToken.payload.exp)}</span>
                      {decodedToken.isExpired ? (
                        <X className="h-4 w-4 text-red-500" />
                      ) : (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  )}

                  {decodedToken.payload.iat && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Issued at: {formatDate(decodedToken.payload.iat)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Signature
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(decodedToken.signature, 'signature')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 p-4 rounded-lg break-all font-mono text-sm">
                  {decodedToken.signature}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default JwtDecoder;