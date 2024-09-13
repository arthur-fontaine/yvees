// https://stackoverflow.com/a/70307091

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<
  Start extends number,
  End extends number,
> = Exclude<Enumerate<End>, Enumerate<Start>>
