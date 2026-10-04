import { SetMetadata } from '@nestjs/common';

// Ce décorateur ajoute la métadonnée 'isPublic' = true
export const Public = () => SetMetadata('isPublic', true);
