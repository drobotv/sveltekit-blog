import { code } from "@cartamd/plugin-code";
import { Carta } from "carta-md";
import DOMPurify from "isomorphic-dompurify";

export const carta = new Carta({
  extensions: [code()],
  sanitizer: DOMPurify.sanitize
});
